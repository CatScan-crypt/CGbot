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
  }
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendButton.click();
  }
});