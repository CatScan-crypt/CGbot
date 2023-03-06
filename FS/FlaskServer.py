from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/chatbot', methods=['POST'])
def test():
    response = 'This is a response from the Flask server'
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run()
