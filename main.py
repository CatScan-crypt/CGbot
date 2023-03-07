#main.py
import openai
import json
from dotenv import load_dotenv
from options import chat_options
from chat_functions import StartToChat
import os

# Load environment variables from .env file or local vars
load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Prompt user to pick an option
selected_input_option = input("Enter an option:\n1. Enter message\n2. Load from chat_history.json\n")

#Print OpenAI response to CLI in a stream using sys.stdout.flush()
StartToChat(selected_input_option, chat_options)
