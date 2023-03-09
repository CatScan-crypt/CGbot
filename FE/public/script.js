//script.js
const input = document.getElementById('input');
const userOutput = document.getElementById('user-output');
const assistantOutput = document.getElementById('assistant-output');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
  const message = input.value;
  if (message.trim() !== '') {

    userBubble(message)
    // Send message to Flask server

    sendMessageToAPI(message)
  }
});


input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
});
