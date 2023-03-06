const input = document.getElementById('input');
const output = document.getElementById('output');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const message = input.value;
  if (message.trim() !== '') {
    const outputMessage = document.createElement('div');
    outputMessage.innerText = message;
    output.appendChild(outputMessage);
    input.value = '';
    input.focus();

    // Send message to Flask server
    fetch('http://127.0.0.1:5000/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message
      })
    })
      .then(response => response.json())
      .then(data => {
        // Handle response from Flask server
        const responseMessage = document.createElement('div');
        responseMessage.innerText = data.response;
        output.appendChild(responseMessage);
      })
      .catch(error => console.error(error));
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
});
