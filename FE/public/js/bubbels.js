
function userBubble(message){
  const outputMessageContainer = document.createElement('div');
  outputMessageContainer.classList.add('user-bubble-container');
  const outputMessage = document.createElement('div');
  outputMessage.classList.add('user-bubble');
  outputMessage.innerText = message;
  outputMessageContainer.appendChild(outputMessage);
  output.appendChild(outputMessageContainer);
  input.value = '';
  input.focus();
  updateScrollbar()
}

  function assistantBubble(assistantResponseMessage) {
  assistantResponseMessage.classList.add('assistant-bubble');
  const assistantoutputMessageContainer = document.createElement('div');
  assistantoutputMessageContainer.classList.add('assistant-bubble-container');
  assistantoutputMessageContainer.appendChild(assistantResponseMessage);
  output.appendChild(assistantoutputMessageContainer);
  input.value = '';
  input.focus();
}

  
  