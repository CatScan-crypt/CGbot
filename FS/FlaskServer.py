from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/chatbot', methods=['POST'])
def test():
    return jsonify({'message': 'This is a test endpoint!'})

if __name__ == '__main__':
    app.run()
