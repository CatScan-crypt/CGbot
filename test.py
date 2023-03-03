import os
import openai
from dotenv import load_dotenv
import sys
from options import chat_options
from streamer import print_chat_results

# Load environment variables from .env file
load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY")

# Prompt user for chat message input
user_input = input("Enter your message: ")

completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": user_input}
  ],
  **chat_options
)

print_chat_results(completion)
