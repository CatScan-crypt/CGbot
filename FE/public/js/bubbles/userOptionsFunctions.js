
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
    const messageNum = $(this).closest('#user-options-container, #assistant-options-container').attr('data-messages');
    console.log(`Message number ${messageNum} was clicked.`);
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