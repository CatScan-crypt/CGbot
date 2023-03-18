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
    res(response)
  })
  .catch(error => console.error(error));
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



   function res(response){
        // Handle response from server
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let chunks = [];
        
        const assistantResponseMessage = document.createElement('button');   
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
   }



