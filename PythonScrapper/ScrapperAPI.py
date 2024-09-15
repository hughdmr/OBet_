from fastapi import FastAPI
from ScrapperClass import scrapper, winamax_data, betclic_data
from ScrappingUtils import get_data

app = FastAPI()

@app.get("/winamax")
async def root():
    winamax = scrapper(winamax_data)
    return get_data(winamax)


@app.get("/betclic")
async def root():
    betclic = scrapper(betclic_data)
    return get_data(betclic)