# chat_functions.py

import json
import openai
from streamer import print_chat_results

def option_one(chat_options):
    # Prompt user for chat message 
    user_input = input("Enter your message: ")

    completion = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "user", "content": user_input}
      ],
      **chat_options
    )

    print_chat_results(completion, user_input)

def option_two(chat_options):
    # Load messages from JSON file
    with open('chat_history.json', 'r') as f:
        chat_data = json.load(f)

    completion = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=chat_data['messages'],
      **chat_options
    )

    print_chat_results(completion, chat_data['messages'][0]['content'])

def user_options(option, chat_options):
    options = {
        "1": option_one,
        "2": option_two
    }

    selected_function = options.get(option)  
    selected_function(chat_options)
