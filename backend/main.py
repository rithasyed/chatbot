import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai

os.environ['GOOGLE_API_KEY'] = "AIzaSyCNkV7-NmofET4UNhTRS8B-IcIBTq3Yklc"
genai.configure(api_key=os.environ['GOOGLE_API_KEY'])

model = genai.GenerativeModel('gemini-pro')

app = FastAPI()

class UserInput(BaseModel):
    question: str

@app.post("/ask")
async def ask_question(user_input: UserInput):
    try:
        response = model.generate_content(user_input.question)
        return {"response": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

