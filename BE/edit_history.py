import json

def modify_message(index, new_content):
    # Load the chat history from the JSON file
    with open("chat_history.json", "r") as f:
        data = json.load(f)

    # Modify the "content" field of the message at the given index
    data["messages"][index]["content"] = new_content

    # Write the modified JSON data back to the file
    with open("chat_history.json", "w") as f:
        json.dump(data, f)
