# streamer.py
from flask import Response
import json

def print_and_save_chat_results(completion, user_input):
    def generate():
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
                yield str(content)
        
        if assistant_response:
            chat_history.append({"role": "assistant", "content": assistant_response.strip()})

        # Write the updated chat history back to the file
        with open('chat_history.json', 'w') as f:
            json.dump({"messages": chat_history}, f, indent=4)

    return Response(generate(), mimetype='text/plain')
