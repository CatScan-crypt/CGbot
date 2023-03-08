#FlaskServer.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from chat_functions import StartToChat
from options import chat_options
from dotenv import load_dotenv
import os
import openai
import json 

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
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    message = request.json['message']
    return StartToChat(chat_options, message)

if __name__ == '__main__':
    app.run()