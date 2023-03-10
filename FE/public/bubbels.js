
function userBubble(message){
  const outputMessageContainer = document.createElement('div');
  outputMessageContainer.classList.add('user-bubble-container');
  const outputMessage = document.createElement('div');
  outputMessage.classList.add('user-bubble');
  outputMessage.innerText = message;
  outputMessageContainer.appendChild(outputMessage);
  output.appendChild(outputMessageContainer );
  input.value = '';
  input.focus();
}

  function assistantBubble(assistantResponseMessage) {
  assistantResponseMessage.classList.add('assistant-bubble');
  const assistantoutputMessageContainer = document.createElement('div');
  assistantoutputMessageContainer.classList.add('assistant-bubble-container');
  assistantoutputMessageContainer.appendChild(assistantResponseMessage);
  output.appendChild(assistantoutputMessageContainer);

  // Set the height of the newBubble element to match the height of the assistant bubble
  const updateNewBubbleHeight = () => {
    const assistantBubbleHeight = assistantoutputMessageContainer.offsetHeight;
  };
  updateNewBubbleHeight();

  // Listen for changes to the height of the assistant bubble and update the newBubble height accordingly
  const resizeObserver = new ResizeObserver(updateNewBubbleHeight);
  resizeObserver.observe(assistantoutputMessageContainer);
  input.value = '';
  input.focus();
}

  
  