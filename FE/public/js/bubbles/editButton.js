$(document).on('click', '#user-message-edit, #assistant-message-edit', function() {    
    const optionsContainer = $(this).closest('#user-options-container, #assistant-options-container');
    // Get the current text of the bubble div and prompt the user for new text
    const divToEdit = optionsContainer.closest('#user-bubble-container, #assistant-bubble-container').find('#user-bubble, #assistant-bubble');
    const numberTosend = optionsContainer.attr('data-messages')
    enableEditMode(divToEdit,numberTosend);
    optionsContainer.remove();
  });
  function sendEditToServer(numberTosend,newText){
    // sendMessageIndex(numberTosend,newText)
    }


function enableEditMode(divToEdit,numberTosend,) {
  // Replace the div content with an input element that contains the current text
  const currentText = divToEdit.text();
  const inputElement = $('<input>').val(currentText);
  divToEdit.empty().append(inputElement);
  let y = divToEdit.attr('data-messages') 
  x = `currentMessageSetIndex${y}`

  // Create cancel and approve buttons
  const cancelButton = $('<button>').text('Cancel');
  const approveButton = $('<button>').text('Approve');
  const backwards = $('<button>').text('->').attr('id', 'backwards'); 
  backwards.attr('data-messages', divToEdit.attr('data-messages'));
  backwards.attr(x,0);
  const forwards = $('<button>').text('<-').attr('id', 'forwards');
  forwards.attr('data-messages', divToEdit.attr('data-messages'));
  forwards.attr(x,0);
  // When the user clicks the "Cancel" button, disable the edit mode
  cancelButton.on('click', () => {
    saveChanges(divToEdit, currentText);
  });

  // When the user clicks the "Approve" button, update the div content with the new text and disable the edit mode
  approveButton.on('click', () => {
    let y = divToEdit.attr('data-messages') 
        x = `currentMessageSetIndex[${y}]`
    
    if(!sessionStorage.getItem(x)){
      sessionStorage.setItem(x, 0);
    }
    const newText = inputElement.val();
    divToEdit.text(newText);
    saveChanges(divToEdit, newText);
    sendEditToServer(numberTosend,newText)
    if (!divToEdit.parent().find('#backwards').length) {
      divToEdit.parent().append(forwards);
      divToEdit.parent().append(backwards)
    }
    // Call this function before removing the divs
    saveMessages(divToEdit);
    divToEdit.parent().find('#forwards').prop('disabled', true);
    divToEdit.parent().find('#backwards').prop('disabled', false);
    divToEdit.parent().nextAll().remove();
    sessionStorage.setItem(x, +sessionStorage.getItem(x) + 1);
  });
  
  // Append the buttons to the div
  divToEdit.append(cancelButton);
  divToEdit.append(approveButton);
  // Focus on the input element and select its contents
  inputElement.focus().select();
}
function saveChanges(divToEdit, newText) {
  // Replace the input element and buttons with a regular div that contains the new text
  const newDivElement = $('<div>').text(newText);
  divToEdit.empty().append(newDivElement);
}

function saveMessages(divToEdit) {
  // Get the container ID and role from the container element
  const containerId = divToEdit.parent().attr('id');
  const role = containerId.split('-')[0];
  
  // Get the messages from all subsequent containers with the same role
  const messages = [];
  divToEdit.parent().nextAll().each(function() {
    const id = $(this).attr('id');
    if (id.startsWith(role)) {
      const messageText = this.innerText.trim();
      messages.push({ role: role, content: messageText });
    }
  });
  
  let x = divToEdit.attr('data-messages')
  const messageSetsKey = `messageSets${x}`;
  let messageSets = JSON.parse(sessionStorage.getItem(messageSetsKey)) || [];

  // Get the index for the new message set
  messageSets.push({ messages: messages });
  sessionStorage.setItem(messageSetsKey, JSON.stringify(messageSets));
  // Log the saved content to the console
  console.log('Saved content:', messageSets);
}


$(document).on('click', '#backwards , #forwards', function() {
  currentButton = $(this).attr('id')
  currentContainer = $(this).closest('#user-bubble-container, #assistant-bubble-container')
  oppositeButton = currentContainer.find('#backwards , #forwards')

  messagesSetlocation = currentContainer.find('#user-bubble, #assistant-bubble');
  messageSetIndex = messagesSetlocation.attr('data-messages');
  sessionMessagesArray = `messageSets${messageSetIndex}`
  currentMessageSetIndex = `currentMessageSetIndex[${messageSetIndex}]`
  messageSets = JSON.parse(sessionStorage.getItem(sessionMessagesArray));
  indexLength = messageSets.length 

  function goDirection(direction) {
    const current = +sessionStorage.getItem(currentMessageSetIndex);
    const newCurrent = direction === 'backwards' ? current - 1 : current + 1;
    sessionStorage.setItem(currentMessageSetIndex, newCurrent);
  }

  function populateConsole(){console.log(messageSets[sessionStorage.getItem(currentMessageSetIndex)])}
  function checkIf(currentMessageSetIndex){return sessionStorage.getItem(currentMessageSetIndex)}

  switch(currentButton) {
    case 'backwards':
      (checkIf(currentMessageSetIndex) > 0 ) ? (goDirection('backwards'), populateConsole(), $(oppositeButton).prop('disabled', false) ) : null;
      (checkIf(currentMessageSetIndex) <= 0 ) ? $(this).prop('disabled', true) : null;
      break;
    case 'forwards':
    (checkIf(currentMessageSetIndex)  <  indexLength) ? (goDirection('forwards'), populateConsole(), $(oppositeButton).prop('disabled', false)) : null;
    (checkIf(currentMessageSetIndex) >= indexLength) ? $(this).prop('disabled', true) : null;
      break;
}
});
