
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
    const divToEdit = messageNum.closest('#user-bubble-container, #assistant-options-container').find('#user-bubble');
    enableEditMode(divToEdit);
    console.log(`Message number ${messageNum.attr('data-messages')} was clicked.`);
    sendMessageIndex(messageNum)
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
    divToEdit.empty()
    divToEdit.append(inputElement);

    // When the user presses the "Enter" key 
    // update the div content with the new text and disable the edit mode
    inputElement.on('keydown', (event) => {
      if ( event.key !== 'Enter') {
        return;
      }
      const newText = inputElement.val();
      divToEdit.text(newText);
      saveChangesto(divToEdit);
    });
  
    // Focus on the input element and select its contents
    inputElement.focus().select();
  }
  
  function saveChangesto(divToEdit) {
    // Replace the input element with a regular div that contains the new text
    const newText = divToEdit.text();
    const newDivElement = $('<div>').text(newText);
    divToEdit.empty().append(newDivElement);
  }
  