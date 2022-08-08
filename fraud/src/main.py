from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class CustomerFraudCheckRequest(BaseModel):
    email: str


# Fraud checking mocked api
@app.get("/fraud-check")
def is_fraud(request: CustomerFraudCheckRequest):
    return {
        "customer_email": request.email,
        "fraudster": False
    }
