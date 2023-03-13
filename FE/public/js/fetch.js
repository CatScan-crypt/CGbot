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
    // Handle response from server
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let chunks = [];
    
    const assistantResponseMessage = document.createElement('div');   
    assistantBubble(assistantResponseMessage);
    
    //streaming text reaults to the assistant bubble 
    function readStream() {
      return reader.read().then(({ done, value }) => {
        if (done) {
          assistantResponseMessage.innerText = decoder.decode(new Uint8Array(chunks));
  updateScrollbar()

          return;
        }
        if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
          chunks.push(...value);
          const bytes = new Uint8Array(value);
          assistantResponseMessage.innerText += decoder.decode(bytes);
  updateScrollbar()

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