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

  // Replace the div content with an input element that contains the current text
function enableEditMode(divToEdit,numberTosend,) {
  const messages = [];
  const fatherBubble = divToEdit.attr('data-messages')
  console.log(fatherBubble);
  firstMessageText = divToEdit[0].innerText
  console.log(firstMessageText);
  firstMessageLocation = divToEdit.attr('id')
  firstMessageRole = firstMessageLocation.split('-')[0]
  messages.push({father:fatherBubble, childrens: 'true', role:firstMessageRole, content: firstMessageText });
  const messageSetsKey = `messageSets${fatherBubble}`;
  messageSets = []
  messageSets.push({  messages });
  sessionStorage.setItem(messageSetsKey, JSON.stringify(messageSets));


  const currentText = divToEdit.text();
  const inputElement = $('<input>').val(currentText);
  divToEdit.empty().append(inputElement);

  // Create cancel and approve buttons
  const cancelButton = $('<button>').text('Cancel');
  const approveButton = $('<button>').text('Approve');
  const backwards = $('<button>').text('->').attr('id', 'backwards'); 
  const forwards = $('<button>').text('<-').attr('id', 'forwards');
  // When the user clicks the "Cancel" button, disable the edit mode
  cancelButton.on('click', () => {
    saveChanges(divToEdit, currentText);
  });

  // When the user clicks the "Approve" button, update the div content with the new text and disable the edit mode
  approveButton.on('click', () => {
    let currentDiv = divToEdit.attr('data-messages') 
    currentMessageArrayIndex = `currentMessageSetIndex[${currentDiv}]`
    
    if(!sessionStorage.getItem(currentMessageArrayIndex)){
      sessionStorage.setItem(currentMessageArrayIndex, 0);
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
    sessionStorage.setItem(currentMessageArrayIndex, +sessionStorage.getItem(currentMessageArrayIndex) + 1);
  });
  
  // Append the buttons to the div
  divToEdit.append(cancelButton);
  divToEdit.append(approveButton);
  inputElement.focus().select();
}
  // Replace the input element and buttons with a regular div that contains the new text
function saveChanges(divToEdit, newText) {

  const newDivElement = $('<div>').text(newText);
  divToEdit.empty().append(newDivElement);
}
  // Get the container ID and role from the container element
function saveMessages(divToEdit) {
  // Get the messages from all subsequent containers with the same role
  const messages = [];
  const fatherBubble = divToEdit.attr('data-messages')
  divToEdit.parent().nextAll().each(function() {
    const id = $(this).attr('id');
    const role = id.split('-')[0];
    const messageText = this.innerText.trim();
    messages.push({father:fatherBubble, role: role, content: messageText });
  });
  let currentMessageArrayIndex = divToEdit.attr('data-messages')
  const messageSetsKey = `messageSets${currentMessageArrayIndex}`;
  let messageSets = JSON.parse(sessionStorage.getItem(messageSetsKey)) || [];
  // Merge the new messages with the existing messages
  const mergedMessages = messageSets.length > 0
    ? messageSets[0].messages.concat(messages)
    : messages;

  // Update the messageSets array with the merged messages
  messageSets = [{ messages: mergedMessages }];
  // Get the index for the new message set

  sessionStorage.setItem(messageSetsKey, JSON.stringify(messageSets));
  // Log the saved content to the console
  console.log('Saved content:', messageSets);
}

$(document).on('click', '#backwards , #forwards', function() {
  const currentButton = $(this).attr('id')
  const currentContainer = $(this).closest('#user-bubble-container, #assistant-bubble-container')
  const oppositeButton = currentContainer.find('#backwards , #forwards')

  const messagesSetlocation = currentContainer.find('#user-bubble, #assistant-bubble');
  const messageSetIndex = messagesSetlocation.attr('data-messages');
  const sessionMessagesArray = `messageSets${messageSetIndex}`
  const currentMessageSetIndex = `currentMessageSetIndex[${messageSetIndex}]`
  const messageSets = JSON.parse(sessionStorage.getItem(sessionMessagesArray));
  const indexLength = messageSets.length 

  function messagesArray() {return messageSets[sessionStorage.getItem(currentMessageSetIndex)]}
  function populateOutput() {
    const outputArea = document.getElementById('output-inner');
    outputArea.innerHTML = '';

       messagesArray = messagesArray()
       console.log(messagesArray.messages);
       messagesArray.messages.forEach((messages) => {
      if (messages.role == 'user') {
        if(messages.childrens){console.log(messages.childrens);}
        userBubble(messages.content);
      } else {
        if(messages.childrens){console.log(messages.childrens);}
        assistantBubble(messages.content);
      } 
    });
  }
  function populateConsole(){populateOutput(); console.log(messagesArray )}
  function checkIf(currentMessageSetIndex){return sessionStorage.getItem(currentMessageSetIndex)}
  function goDirection(direction) {
    current = +sessionStorage.getItem(currentMessageSetIndex);
    newCurrent = direction === 'backwards' ? current - 1 : current + 1;
    sessionStorage.setItem(currentMessageSetIndex, newCurrent);
  }

  switch(currentButton) {
    case 'backwards':
      (checkIf(currentMessageSetIndex)  > 0 ) ? (goDirection('backwards'), populateConsole(), $(oppositeButton).prop('disabled', false) ) : null;
      (checkIf(currentMessageSetIndex) <= 0 ) ? $(this).prop('disabled', true) : null;
      break;
    case 'forwards':
    (checkIf(currentMessageSetIndex)  < indexLength) ? (goDirection('forwards'), populateConsole(), $(oppositeButton).prop('disabled', false)) : null;
    (checkIf(currentMessageSetIndex) >= indexLength) ? $(this).prop('disabled', true) : null;
      break;
}
});




