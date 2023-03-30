//script.js
const input = document.getElementById('input');
const output = document.getElementById('output-inner');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const message = input.value;
    addBubble(message, 'user')
    // Send a message to the server
    sendMessageToAPI(message)

});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
});
