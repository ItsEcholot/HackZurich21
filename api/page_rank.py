import os
import glob2
import pandas as pd
import numpy as np
import json
import re
import functools
from prompt_toolkit import prompt
from inverted_index.prompt import SearchCompleter
from inverted_index.inverted_index import InvertedIndex, LevenshteinRankingInvertedIndex

class PageRank:
  def __init__(self, doc_path):
    self.doc_path = doc_path
    self.docs_json=[]
    self.docs=[]
    self.posting_list = {}
    self.tf = {}

    self.read_docs()
    self.create_index()

    self.n_docs = len(self.docs)

  def read_docs(self):
    for doc_id, doc in enumerate(sorted(glob2.glob(self.doc_path))):
      with open(doc) as f:
        json_doc = json.load(f)
        if len(json_doc["paragraphs"]) > 0:
          self.docs_json.append(json_doc)
          text = functools.reduce((lambda x, y : x + " " + y), json_doc["paragraphs"])
          self.docs.append((doc_id,text))
          for term in (re.sub('[^A-Za-z ]+', '', text)).lower().split():
            if (term, doc_id) in self.tf:
              self.tf[(term, doc_id)] += 1
            else:
              self.tf[(term, doc_id)] = 1
    
    self.n_docs = len(self.docs)

  def create_index(self):
    # self.ii = InvertedIndex()
    # self.ii.index(map(lambda x : x[1],self.docs))
    for doc_id, text in self.docs:
      for term in text.split(" "):
        term = self.normalize_term(term)
        if term == "":
          continue

        if term not in self.posting_list:
          self.posting_list[term] = set([doc_id])
        else:
          self.posting_list[term].add(doc_id)

  def df(self, term):
    if term in self.posting_list:
      return len(self.posting_list[term])
    else:
      return 0

  def normalize_term(self, term):
    return re.sub('[^A-Za-z]+', '', term.lower())

  def tf(self, term, doc_id):
    term = self.normalize_term(term)
    return self.tf[(term, doc_id)]

  def tf_idf(self, term, doc_id):
    term = self.normalize_term(term)
    if (term, doc_id) in self.tf:
      return self.tf[(term, doc_id)] * np.log(self.n_docs / self.df(term))
    else:
      return 0

  def search(self, query):
    query = re.sub('[^A-Za-z ]+', '', query.lower()).split(" ")

    query_vector = np.zeros(len(query))
    doc_vectors = np.zeros((self.n_docs, len(query)))

    for term_i, term in enumerate(query):
      if term in self.posting_list:
        for doc_id in self.posting_list[term]:
          doc_vectors[doc_id, term_i] = self.tf[term, doc_id] * self.tf_idf(term, doc_id)
          query_vector[term_i] = 1

    res = []

    for i in range(self.n_docs):
      res.append(np.dot(doc_vectors[i],query_vector))

    return self.docs[np.argmax(res)]

  def rank(self, k):
    if k > self.n_docs:
      k = self.n_docs
    res = []
    for term in self.sposting_list:
      for doc_id in self.posting_list[term]:
        tfidf = self.tf_idf(term, doc_id)

        res.append((tfidf, term))

    sorted(res, key=(lambda x : x[0]))
    return res[-k:]



  def get_terms(self, k):
    if k > self.n_docs:
      k = self.n_docs
    
    terms = []
    for term in self.posting_list:
      df = self.df(term)
      terms.append((term, df))
    
    sorted(terms, key=(lambda x : x[1]))
    return terms[-k:]


if __name__ == "__main__":
  main()