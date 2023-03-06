#main.py
import openai
import json
from dotenv import load_dotenv
from options import chat_options
from chat_functions import user_options
import os

# Define the command to run the other Python file
command = "start /B cmd.exe /c python UI/web.py "

# Use os.system to run the command
os.system(command)
# Load environment variables from .env file or local vars
load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Prompt user to pick an option
selected_input_option = input("Enter an option:\n1. Enter message\n2. Load from chat_history.json\n")

#Print response to CLI and save memory for context
user_options(selected_input_option, chat_options)

