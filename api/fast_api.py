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
def read_pairs():
    return {"Hello": "World"}

@app.get("/terms/{n}")
def read_terms(n: int):
    return index.get_terms(n)

@app.get("/search/{query}")
def read_search(query: str):
    res = set(index.search(urllib.parse.unquote(query)))

    if len(res) > 0:
        return {"query": list(res)}
    else:
        return {}