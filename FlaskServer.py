from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/api/chatbot', methods=['POST'])
def chatbot():
 #   get user input from POST request

    
    # pass user input to Python CLI app using subprocess
    result = subprocess.run(['python', 'main.py --console'], capture_output=True)

    # get output from Python CLI app
    output = result.stdout.decode()

    # return output to front-end
    return jsonify({'response': output})

if __name__ == '__main__':
    app.run(debug=True)
