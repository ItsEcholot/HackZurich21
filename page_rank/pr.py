import sklearn
import os
import glob2
import pandas as pd
import numpy as np
import json
import functools
from prompt_toolkit import prompt
from inverted_index.prompt import SearchCompleter
from inverted_index.inverted_index import InvertedIndex

class PageRank:
  def __init__(self, doc_path):
    self.doc_path = doc_path
    self.docs_json=[]
    self.docs=[]
    self.index = None

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

  # def tf_idf(self, doc_id, term):
  #   idf = np.log(self.n_docs /)


def main():
  doc_path = f"../data/data_from_2020/*json"
  query = "Parklatz"
  pr = PageRank(doc_path)

  print(pr.ii.search(query)[0])



  # for i in range(5):
  #   print(pr.docs[i]["paragraphs"])


if __name__ == "__main__":
  main()