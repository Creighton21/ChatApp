from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Allow CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define initial suggested prompts
initial_suggested_prompts = [
    "Hello! How can I assist you today?",
    "What can I help you with?",
    "Feel free to ask me anything.",
]

@app.get("/suggested_prompts")
async def get_suggested_prompts():
    return {"suggestedPrompts": initial_suggested_prompts}

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    message = data.get("message")
    history = data.get("history")

    # Process the incoming message and history
    # Generate response based on the message and history
    ai_response = {
        "text": "This is a sample response from FastAPI based on the message and history.",
        "imageList": [
            {"url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI2NzQ4NzMz&ixlib=rb-1.2.1&q=80&w=400", "source": "example1.com"},
            {"url": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjI2NzQ4NzMz&ixlib=rb-1.2.1&q=80&w=400", "source": "example2.com"}
        ],
        "references": [
            {"title": "Reference 1", "documentUrl": "https://arxiv.org/pdf/2401.00002"},
            {"title": "Reference 2", "documentUrl": "https://arxiv.org/pdf/2401.00002"}
        ],
        "suggestedPrompts": [
            "How can I help you with this topic?",
            "Would you like to learn more about this?",
            "Feel free to ask more questions."
        ]
    }
    return ai_response



# Uvicorn command to run the FastAPI app
# uvicorn main:app --reload

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)


    