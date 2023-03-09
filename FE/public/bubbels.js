
function userBubble(message){
  const outputMessageContainer = document.createElement('div');
  outputMessageContainer.classList.add('user-bubble-container');
  const outputMessage = document.createElement('div');
  outputMessage.classList.add('user-bubble');
  outputMessage.innerText = message;
  outputMessageContainer.appendChild(outputMessage);

  // create new div to mimic previous assistant-bubble size
  const previousAssistantBubble = document.querySelector('.assistant-bubble-container:last-of-type .assistant-bubble');
  if (previousAssistantBubble) {
    const previousAssistantBubbleStyle = getComputedStyle(previousAssistantBubble);
    const previousAssistantBubbleSize =  ' ' + previousAssistantBubbleStyle.getPropertyValue('height');
    const newBubble = document.createElement('div');
    newBubble.classList.add('assistant-bubble');
    newBubble.style.width = previousAssistantBubbleStyle.getPropertyValue('width');
    newBubble.style.height = previousAssistantBubbleStyle.getPropertyValue('height');
    newBubble.style.backgroundColor = 'transparent'; // set background color to transparent
    const newBubbleContainer = document.createElement('div');
    newBubbleContainer.classList.add('assistant-bubble-container');
    newBubbleContainer.appendChild(newBubble);
    assistantOutput.appendChild(newBubbleContainer);
  }
  userOutput.appendChild(outputMessageContainer);
  input.value = '';
  input.focus();
}

function assistantBubble(assistantResponseMessage) {
  assistantResponseMessage.classList.add('assistant-bubble');
  assistantResponseMessage.innerText = '';
  const assistantoutputMessageContainer = document.createElement('div');
  assistantoutputMessageContainer.classList.add('assistant-bubble-container');
  assistantoutputMessageContainer.appendChild(assistantResponseMessage);
  assistantOutput.appendChild(assistantoutputMessageContainer);

  // Create new div to push user messages upwards
  const newBubble = document.createElement('div');
  newBubble.classList.add('user-bubble');
  newBubble.style.backgroundColor = 'transparent'; 
  const newBubbleContainer = document.createElement('div');
  newBubbleContainer.classList.add('user-bubble-container');
  newBubbleContainer.appendChild(newBubble);
  userOutput.appendChild(newBubbleContainer);
  
  // Set the height of the newBubble element to match the height of the assistant bubble
  const updateNewBubbleHeight = () => {
    const assistantBubbleHeight = assistantoutputMessageContainer.offsetHeight;
    newBubble.style.height = `${assistantBubbleHeight}px`;
  };

  updateNewBubbleHeight();

  // Listen for changes to the height of the assistant bubble and update the newBubble height accordingly
  const resizeObserver = new ResizeObserver(updateNewBubbleHeight);
  resizeObserver.observe(assistantoutputMessageContainer);

  input.value = '';
  input.focus();
}

  
  