from fastapi import FastAPI
from fastapi.responses import FileResponse

app = FastAPI()


@app.get("/")
def root():
    return FileResponse("properties.html")


@app.get("/listings")
def listings():
    return [
        {
            "address": "123 Main Street",
            "price": 850000,
            "beds": 3,
            "baths": 2
        },
        {
            "address": "55 Ocean Drive",
            "price": 1200000,
            "beds": 4,
            "baths": 3
        }
    ]
