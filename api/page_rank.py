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

    self.read_docs()
    self.create_index()
    
    self.n_docs = len(self.docs)

  def read_docs(self):
    for doc in sorted(glob2.glob(self.doc_path)):
      with open(doc) as f:
        json_doc = json.load(f)
        if len(json_doc["paragraphs"]) > 0:
          self.docs_json.append(json_doc)
          self.docs.append(functools.reduce((lambda x, y : x + " " + y), json_doc["paragraphs"]))
    
    self.n_docs = len(self.docs)

  def create_index(self):
    self.ii = InvertedIndex()
    self.ii.index(self.docs)

  def df(self, term):
    if term in self.ii.posting_list:
      return len(self.ii.posting_list[term])
    else:
      return 0

  def tf(self, term, docid):
    pass

  def search(self, query):
    return self.ii.search(query)

  def get_terms(self, n):
    return 0


if __name__ == "__main__":
  main()