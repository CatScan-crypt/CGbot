
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
    const messageNum = $(this).closest('#user-options-container, #assistant-options-container');
    
    // Get the current text of the bubble div and prompt the user for new text
    const divToEdit = messageNum.closest('#user-bubble-container, #assistant-bubble-container').find('#user-bubble, #assistant-bubble');
    enableEditMode(divToEdit);
    messageNum.remove();
    console.log(`Message number ${messageNum.attr('data-messages')} was clicked.`);
    const numberTosend = messageNum.attr('data-messages')
    sendMessageIndex(numberTosend)
  });



  function sendMessageIndex(indexMessagenumber) {
    const url = 'http://127.0.0.1:5000/editMessageEndpoint';
    const payload = JSON.stringify({ indexMessage: indexMessagenumber });
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload
    })
    .then(response => {
      if (response.ok) {
        console.log('Message index sent successfully!');
      } else {
        console.error('Error sending message index:', response.status);
      }
    })
    .catch(error => {
      console.error('Error sending message index:', error);
    });
  }



function enableEditMode(divToEdit) {
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
