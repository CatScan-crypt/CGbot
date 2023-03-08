//script.js
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
  .then(response => {
  // Handle response from Flask server
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let chunks = [];

  const responseMessage = document.createElement('span');
  output.appendChild(responseMessage);

  function readStream() {
    return reader.read().then(({ done, value }) => {
      if (done) {
        responseMessage.innerText = decoder.decode(chunks);
        return;
      }
      if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
        chunks.push(value);
        responseMessage.innerText += decoder.decode(value);
      } else {
        console.log('Invalid response body:', value);
      }
      return readStream();
    });
  }
  
  

    return readStream();
  })
  .catch(error => console.error(error));

  }})

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
});


