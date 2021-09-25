import os
import glob2
import pandas as pd
import numpy as np
import json
import functools
from prompt_toolkit import prompt
from inverted_index.prompt import SearchCompleter
from inverted_index.inverted_index import InvertedIndex, LevenshteinRankingInvertedIndex

class PageRank:
  def __init__(self, doc_path):
    self.doc_path = doc_path
    self.docs_json=[]
    self.docs=[]
    self.ii = None
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
          self.docs.append(text)
          for term in (text.lower().replace(".", "").replace("'", "").replace("!", "").replace("?", "")):
            if (term, doc_id) in self.tf:
              tf_term_did = self.tf[(term, doc_id)]
              self.tf[(term, doc_id)] = tf_term_did + 1
            else:
              self.tf[(term, doc_id)] = 1
    
    self.n_docs = len(self.docs)

  def create_index(self):
    self.ii = InvertedIndex()
    self.ii.index(self.docs)

  def df(self, term):
    if term in self.ii.posting_list:
      return len(self.ii.posting_list[term])
    else:
      return 0

  def normalize_term(self, term):
    return term.lower().replace(".", "").replace("'", "").replace("!", "").replace("?", "")

  def tf(self, term, doc_id):
    term = self.normalize_term(term)
    return self.tf[(term, doc_id)]

  def tf_idf(self, term, doc_id):
    term = self.normalize_term(term)
    return self.tf[(term, doc_id)] * np.log(self.n / self.df(term))

  def search(self, query):
    return self.ii.search(query)

  def get_terms(self, k):
    if k > self.n_docs:
      k = self.n_docs
    
    terms = []
    for term in self.ii.posting_list:
      df = self.df(term)
      terms.append((term, df))
    
    sorted(terms, key=(lambda x : x[1]))
    return terms[-k:]


if __name__ == "__main__":
  main()