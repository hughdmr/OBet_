from fastapi import FastAPI
from ScrapperClass import scrapper, winamax_data, betclic_data

app = FastAPI()

@app.get("/winamax")
async def root():
    winamax = scrapper(winamax_data)
    return winamax.get_match_list()


@app.get("/betclic")
async def root():
    betclic = scrapper(betclic_data)
    return betclic.get_match_list()