# main.py

import os
import openai
import json
from dotenv import load_dotenv
from options import chat_options
from chat_functions import user_options

# Define the initial JSON data
data = {"messages": []}

# Open the file in write mode and write the JSON data to it
with open("chat_history.json", "w") as f:
    json.dump(data, f)

# Load environment variables from .env file or local vars
load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")


# Prompt user to pick an option
selected_input_option = input("Enter an option:\n1. Enter message\n2. Load from chat_history.json\n")


user_options(selected_input_option, chat_options)
