# chat_functions.py
import json
import openai
from options import chat_options
from streamer import print_and_save_chat_results

def StartToChat(chat_options, user_input):
    # Load chat history from file
    with open('chat_history.json', 'r') as f:
        chat_data = json.load(f)
    
    # Load previous messages from chat_data
    messages = chat_data['messages']

    # Update chat_data with latest user input
    messages.append({"role": "user", "content": user_input})
    chat_data['messages'] = messages

    # Call OpenAI chat API
    completion = openai.ChatCompletion.create(
      messages=messages,
      **chat_options
    )

    # # Save chat history to file
    # print_and_save_chat_results(completion, user_input)
    # with open('chat_history.json', 'w') as f:
    #     json.dump(chat_data, f)

    # Return chat history to Flask server
    return print_and_save_chat_results(completion, user_input)
        

