from typing import Optional
from page_rank import PageRank

import urllib.parse

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

doc_path = f"../../data_from_2020/*json"


index = PageRank(doc_path)

@app.get("/pairs")
def get_pairs():
    return {"Hello": "World"}

@app.get("/terms/{n}")
def get_terms(n: int):
    return index.get_terms(n)

@app.get("/tfidf/{term}&{doc_id}")
def get_tf_idf(term: str, doc_id: int):
    return index.tf_idf(term, doc_id)

@app.get("/rank/{n}")
def get_top(n: int):
    return index.rank(n)

@app.get("/search_best/{query}")
def get_search(query: str):
    res = set(index.search(urllib.parse.unquote(query)))

    if len(res) > 0:
        return {"query": list(res)}
    else:
        return {}

@app.get("/search/{query}&{k}")
def get_search_top_k(query: str, k: int):
    res = index.search_k(urllib.parse.unquote(query), k)

    if len(res) > 0:
        return {"query": list(res)}
    else:
        return {}

@app.get("/posting")
def get_posting_list():
    return index.posting_list

@app.get("/posting_len")
def get_posting_len():
    return len(index.posting_list)