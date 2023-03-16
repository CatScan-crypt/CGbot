function userMessageCopy(outputMessage) {
    const userMessageButton = $('#user-message-copy');
    userMessageButton.on('click', function() {
        text = outputMessage[0].innerText
        navigator.clipboard.writeText(text)
        .then(() => console.log('Text copied to clipboard:', text))
    });
  }
