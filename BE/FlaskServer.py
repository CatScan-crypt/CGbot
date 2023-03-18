#FlaskServer.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from chat_functions import StartToChat
from options import chat_options
from dotenv import load_dotenv
import os
import openai
import json 
from edit_history import modify_message

# Define the initial JSON data
chat_data = {"messages": []}

# Open the file in write mode and write the JSON data to it
with open("chat_history.json", "w") as f:
    json.dump(chat_data, f)

# Load environment variables from .env file or local vars
load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)


@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    message = request.json['message']
    return StartToChat(chat_options, message)



@app.route('/editMessageEndpoint', methods=['POST'])
def edit_message():
    index_message = int(request.json['index_message']) 
    message_content = request.json['message_content']
    print(f"Index message fetched: {index_message, message_content}")

    # Call the modify_message function from the edit_history module
    modify_message(index_message, message_content)

    return StartToChat(chat_options, message_content)
if __name__ == '__main__':
    app.run()