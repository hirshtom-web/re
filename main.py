from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
import os
import requests

load_dotenv()

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

TOKEN = os.getenv("BRIDGE_TOKEN")


@app.get("/")
def root():
    return {
        "message": "Real Estate AI backend is running."
    }


@app.get("/listings")
def listings():
    url = "https://api.bridgedataoutput.com/api/v2/OData/miamire/Property"

    params = {
        "access_token": TOKEN,
        "$top": 20
    }

    response = requests.get(url, params=params)
    return response.json()


@app.get("/property-data/{property_id}")
def property_data(property_id: str):

    url = "https://api.bridgedataoutput.com/api/v2/OData/miamire/Property"

    params = {
        "access_token": TOKEN,
        "$filter": f"ListingKey eq '{property_id}'"
    }

    response = requests.get(
        url,
        params=params
    )

    data = response.json()

    properties = data.get("value", [])

    if not properties:
        return {
            "error": "Property not found",
            "id": property_id
        }

    item = properties[0]

    return {
        "id": property_id,
        "title": item.get("UnparsedAddress", ""),
        "price": item.get("ListPrice", ""),
        "location": item.get("City", ""),
        "images": [
            media.get("MediaURL")
            for media in item.get("Media", [])
            if media.get("MediaURL")
        ],
        "bedrooms": item.get("BedroomsTotal", ""),
        "bathrooms": item.get("BathroomsTotalInteger", ""),
        "sqft": item.get("LivingArea", "")
    }

@app.get("/mls")
async def mls(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="mls.html",
        context={}
    )

@app.get("/residence.html")
async def residence(request: Request):
    return FileResponse("residence.html")


@app.get("/property/{slug}/{property_id}")
async def property_page(
    request: Request,
    slug: str,
    property_id: str
):
    return FileResponse("residence.html")


