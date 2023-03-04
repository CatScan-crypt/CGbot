# chat_functions.py

import json
import openai
from streamer import print_chat_results

def option_one(chat_options):
    counter = 0
    
    # Load messages from JSON file
    with open('chat_history.json', 'r') as f:
        chat_data = json.load(f)

    while True:
        if counter > 0:
            # Load previous messages from chat_data
            user_input = input("Enter your message with history: ")
            messages = chat_data['messages']
        
            # Update chat_data with latest user input
            messages.append({"role": "user", "content": user_input})
            chat_data['messages'] = messages
        
            # Write updated chat_data back to JSON file
            with open('chat_history.json', 'w') as f:
                json.dump(chat_data, f)
        else:
            # Prompt user for chat message
            user_input = input("Enter your message: ")
            messages = [{"role": "user", "content": user_input}]

        
        completion = openai.ChatCompletion.create(
          messages=messages,
          **chat_options
        )

        print_chat_results(completion, user_input)

        # Increment the counter and print the current iteration number
        counter += 1
        print("Iteration:", counter)



def option_two(chat_options):
    # Load messages from JSON file
    with open('chat_history.json', 'r') as f:
        chat_data = json.load(f)

    completion = openai.ChatCompletion.create(
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
