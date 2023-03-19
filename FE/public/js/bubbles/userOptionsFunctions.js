//needs refactoring 
function userMessageCopy(outputMessage) {
  const userMessageButton = $('#user-message-copy');
  userMessageButton.on('click', function() {
      text = outputMessage[0].innerText
      navigator.clipboard.writeText(text)
      .then(() => console.log('Text copied to clipboard:', text))
  });
}

function assistantMessageCopy(assistantResponseMessage) {
  const assistantButton = $('#assistant-message-copy');
  assistantButton.on('click', function() {
      text = assistantResponseMessage[0].innerText
      navigator.clipboard.writeText(text)
      .then(() => console.log('Text copied to clipboard:', text))
  });
}


  $(document).on('click', '#user-message-edit, #assistant-message-edit', function() {
    
    const optionsContainer = $(this).closest('#user-options-container, #assistant-options-container');
    
    // Get the current text of the bubble div and prompt the user for new text
    const divToEdit = optionsContainer.closest('#user-bubble-container, #assistant-bubble-container').find('#user-bubble, #assistant-bubble');
    const numberTosend = optionsContainer.attr('data-messages')
    enableEditMode(divToEdit,numberTosend);
    optionsContainer.remove();
  });

  function sendEditToServer(numberTosend,newText){
    sendMessageIndex(numberTosend,newText)
    }


function enableEditMode(divToEdit,numberTosend,) {
  // Replace the div content with an input element that contains the current text
  const currentText = divToEdit.text();
  const inputElement = $('<input>').val(currentText);
  divToEdit.empty().append(inputElement);

  // Create cancel and approve buttons
  const cancelButton = $('<button>').text('Cancel');
  const approveButton = $('<button>').text('Approve');
  const backwards = $('<button>').text('->').attr('id', 'backwards'); 
  backwards.attr('data-messages', divToEdit.attr('data-messages'));
  backwards.attr('currentMessageSetIndex', 0);
  const forwards = $('<button>').text('<-').attr('id', 'forwards');
  forwards.attr('data-messages', divToEdit.attr('data-messages'));
  forwards.attr('currentMessageSetIndex', 0);
  // When the user clicks the "Cancel" button, disable the edit mode
  cancelButton.on('click', () => {
    saveChanges(divToEdit, currentText);
  });

  // When the user clicks the "Approve" button, update the div content with the new text and disable the edit mode
  approveButton.on('click', () => {
    let y = divToEdit.attr('data-messages') 
        x = `currentMessageSetIndex[${y}]`
    
    console.log(sessionStorage.getItem(x))
    
    if(!sessionStorage.getItem(x)){
      
      sessionStorage.setItem(x, 0);
      console.log(sessionStorage.getItem(x));
      console.log("mewo");
      
    }else{
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
    divToEdit.parent().nextAll().remove();
  });
  
  // Append the buttons to the div
  divToEdit.append(cancelButton);
  divToEdit.append(approveButton);

  // Focus on the input element and select its contents
  inputElement.focus().select();
}
// /this.getAttribute('data-messages'),
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
  y = `messageSets${x}`
  console.log(y);
  // Get existing message sets from session storage
  const messageSets = JSON.parse(sessionStorage.getItem(y))|| [];
  console.log('Saved content:', x);

  // Add the new message set and save to session storage
  messageSets.push({ messages: messages });
  sessionStorage.setItem(y, JSON.stringify(messageSets));

// Log the saved content to the console
console.log('New saved content:', messageSets);
}


$(document).on('click', '#backwards', function() {
let currentValue = $(this).attr('currentMessageSetIndex');
  const messagesSetlocation = $(this).closest('#user-bubble-container, #assistant-bubble-container').find('#user-bubble, #assistant-bubble');
  const messageSetIndex = messagesSetlocation.attr('data-messages');
  x = `currentMessageSetIndex[${messageSetIndex}]`
  y = `messageSets${messageSetIndex}`
  // Get existing message sets from session storage
  const messageSets = JSON.parse(sessionStorage.getItem(y));
  console.log(messageSets.length  );
  if (sessionStorage.getItem(x) <= messageSets.length  ) {
    sessionStorage.setItem(x, +sessionStorage.getItem(x) - 1);

    $('#forwards').attr('id', 'forwards').prop('disabled', false);
  }
  if (sessionStorage.getItem(x) < 1) {
    $('#backwards').attr('id', 'backwards').prop('disabled', true);
  }
  console.log(messageSets[sessionStorage.getItem(x)]);
});



$(document).on('click', '#forwards', function() {
  console.log(sessionStorage.getItem(x));

  let currentValue = $(this).attr('currentMessageSetIndex');
  const messagesSetlocation = $(this).closest('#user-bubble-container, #assistant-bubble-container').find('#user-bubble, #assistant-bubble');
  const messageSetIndex = messagesSetlocation.attr('data-messages');
   y = `messageSets${messageSetIndex}`
  // Get existing message sets from session storage
  const messageSets = JSON.parse(sessionStorage.getItem(y));
  if (sessionStorage.getItem(x) < messageSets.length  ) {
    sessionStorage.setItem(x, +sessionStorage.getItem(x) + 1);
    $('#backwards').attr('id', 'backwards').prop('disabled', false);
  }
  if (sessionStorage.getItem(x) == messageSets.length  ) {
    $('#forwards').attr('id', 'forwards').prop('disabled', true);
  }
  

  console.log(messageSets[sessionStorage.getItem(x)]);
  console.log(sessionStorage.getItem(x));
});



