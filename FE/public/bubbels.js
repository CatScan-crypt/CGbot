
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
  
    // create new div to mimic previous user-bubble size
    const previousUserBubble = document.querySelector('.user-bubble-container:last-of-type .user-bubble');
    if (previousUserBubble) {
      
      const previousUserBubbleStyle = getComputedStyle(previousUserBubble);
      const previousUserBubbleSize =  ' ' + previousUserBubbleStyle.getPropertyValue('height');
      const newBubble = document.createElement('div');
      newBubble.classList.add('user-bubble');
      newBubble.style.width = previousUserBubbleStyle.getPropertyValue('width');
      newBubble.style.height = previousUserBubbleStyle.getPropertyValue('height');
      newBubble.style.backgroundColor = 'transparent'; // set background color to transparent
      const newBubbleContainer = document.createElement('div');
      newBubbleContainer.classList.add('user-bubble-container');
      newBubbleContainer.appendChild(newBubble);
      userOutput.appendChild(newBubbleContainer);
    }
  
    assistantOutput.appendChild(assistantoutputMessageContainer);
    input.value = '';
    input.focus();
  }
  
  