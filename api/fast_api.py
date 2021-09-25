from typing import Optional
from page_rank import PageRank

from fastapi import FastAPI

doc_path = f"../../data/data_from_2020/*json"

app = FastAPI()

index = PageRank(doc_path)

@app.get("/pairs")
def read_pairs():
    return {"Hello": "World"}

@app.get("/terms/{n}")
def read_terms(n: int):
    term_list = index.get_terms(n)

    return {}

@app.get("/search/{query}")
def read_search(query: str):
    res = index.search(query)

    if len(res) > 0:
        return {"query": res[0]}
    else:
        return {}