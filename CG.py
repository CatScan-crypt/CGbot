# main.py

import os
import openai
import json
from dotenv import load_dotenv
from options import chat_options
from chat_functions import user_options

# Load environment variables from .env file or local vars
load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")


# Prompt user to pick an option
option = input("Enter an option:\n1. Enter message\n2. Load from chat_history.json\n")

user_options(option, chat_options)
