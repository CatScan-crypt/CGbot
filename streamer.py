# streamer.py
import sys
import json

def print_chat_results(completion, user_input):
    # Load existing chat history from the file
    with open('chat_history.json', 'r') as f:
        chat_history = json.load(f)["messages"]
    
    # Add the user input to the chat history
    chat_history.append({"role": "user", "content": user_input})
    
    # Generate and add the assistant response(s) to the chat history
    assistant_response = ""
    for result in completion:
        key = result.choices[0].delta
        content = key.get('content')
        if content:
            assistant_response += content
            sys.stdout.write(str(content))
            sys.stdout.flush()
    if assistant_response:
        chat_history.append({"role": "assistant", "content": assistant_response.strip()})
    
    # Write the updated chat history back to the file
    with open('chat_history.json', 'w') as f:
        json.dump({"messages": chat_history}, f, indent=4)
