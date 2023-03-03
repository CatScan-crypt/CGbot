# streamer.py
import sys
import json

def print_chat_results(completion, user_input):
    chat_history = [{"role": "user", "content": user_input}]
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
    with open('chat_history.json', 'w') as f:
        json.dump({"messages": chat_history}, f, indent=4)

    print('\n' + ''.join([msg['content'] for msg in chat_history[1:]]))
