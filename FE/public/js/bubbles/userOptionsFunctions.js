
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


function enableEditMode(divToEdit,numberTosend) {
  // Replace the div content with an input element that contains the current text
  const currentText = divToEdit.text();
  const inputElement = $('<input>').val(currentText);
  divToEdit.empty().append(inputElement);

  // Create cancel and approve buttons
  const cancelButton = $('<button>').text('Cancel');
  const approveButton = $('<button>').text('Approve');
  
  // When the user clicks the "Cancel" button, disable the edit mode
  cancelButton.on('click', () => {
    saveChanges(divToEdit, currentText);
  });

  // When the user clicks the "Approve" button, update the div content with the new text and disable the edit mode
  approveButton.on('click', () => {
    const newText = inputElement.val();
    divToEdit.text(newText);
    saveChanges(divToEdit, newText);
    sendEditToServer(numberTosend,newText)
    function saveMessages(divToEdit) {
      // Create an array to hold the messages
      const messages = [];
    
      // Loop through each sibling div
      divToEdit.parent().nextAll().each(function() {
        const role = this.id.split("-")[0]; // Extract the role from the id attribute
        const content = this.innerText.trim(); // Get the text content of the div and trim whitespace
    
        // Add the message to the array
        messages.push({
          role: role,
          content: content
        });
      });
    
      // Convert the messages array to JSON and save it in session storage
      const json = JSON.stringify({ messages: messages });
      console.log(json)
      sessionStorage.setItem('messages', json);
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

function saveChanges(divToEdit, newText) {
  // Replace the input element and buttons with a regular div that contains the new text
  const newDivElement = $('<div>').text(newText);
  divToEdit.empty().append(newDivElement);
}



function sendMessageIndex(indexMessagenumber,messageContent) {
  const url = 'http://127.0.0.1:5000/editMessageEndpoint';
  const payload = JSON.stringify({ 
    index_message: indexMessagenumber,
    message_content: messageContent
  });
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
  .then(response => {
    if (response.ok) {
      res(response)
      console.log('Message edit sent successfully!');
    } else {
      console.error('Error sending message edit:', response.status);
    }
  })
  .catch(error => {
    console.error('Error sending message edit:', error);
  });
}
