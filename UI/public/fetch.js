   function sendMessageToAPI(message){
   // Send message to Flask server
   fetch('http://127.0.0.1:5000/api/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  })
  .then(response => {
    // Handle response from Flask server
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let chunks = [];

    const outputMessageContainer1 = document.createElement('div');
    outputMessageContainer1.classList.add('assistant-bubble-container');
    const responseMessage = document.createElement('div');
    responseMessage.classList.add('assistant-bubble'); // fix: add class to responseMessage
    responseMessage.innerText = message; // add message to responseMessage
    outputMessageContainer1.appendChild(responseMessage);
    assistantOutput.appendChild(outputMessageContainer1);
    input.value = '';
    input.focus();
    
    function readStream() {
      return reader.read().then(({ done, value }) => {
        if (done) {
          responseMessage.innerText = decoder.decode(new Uint8Array(chunks));
          responseMessage.innerText = decoder.decode(new Uint8Array(chunks));
          return;
        }
        if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
          chunks.push(...value);
          const bytes = new Uint8Array(value);
          responseMessage.innerText += decoder.decode(bytes);
        } else {
          console.log('Invalid response body:', value);
        }
        return readStream();
      });
    }
    return readStream();
  })
  .catch(error => console.error(error));
   }