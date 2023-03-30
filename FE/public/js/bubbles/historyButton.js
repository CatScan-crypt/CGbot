sessionStorage.setItem(`currentMessageSetIndex0` , 0)

$(document).on('click', '#backwards , #forwards', function() {
 
    const currentButton = $(this).attr('id')
    sessionStorage.setItem("containerNumber" , currentButton)  

    containerNumber = currentButton
    const currentContainer = $(this).closest('#user-bubble-container, #assistant-bubble-container')
    const oppositeButton = currentContainer.find('#backwards , #forwards')
  
    const messagesSetlocation = currentContainer.find('#user-bubble, #assistant-bubble');
    const messageSetIndex = messagesSetlocation.attr('data-messages');
    const sessionMessagesArray =   `MessagesArrayCounter0`
    const currentMessageSetIndex = `currentMessageSetIndex0`
    
    const messageSets = (sessionStorage.getItem(sessionMessagesArray));
    const currentMessageSetIndexNumber = sessionStorage.getItem(currentMessageSetIndex)

    const indexLength = JSON.parse(messageSets).length

    console.log(currentMessageSetIndexNumber);

     messagesArray =  JSON.parse(sessionStorage.getItem(`MessagesArrayCounter0`))
      function populateOutput(messagesArray) {
      const outputArea = document.getElementById('output-inner');
      outputArea.innerHTML = '';
  

         messagesArray[currentMessageSetIndexNumber].messages.forEach((messages) => {
        if (messages.role == 'user') {
          let a = false
          if(messages.childrens){
             a = true 
            }
            addBubble(messages.content,messages.role, a);
        } else {
          if(messages.childrens){console.log(messages.childrens);}
          assistantBubble(messages.content);
        } 
      });
      sessionStorage.setItem("containerNumber" , currentButton)  

    }
    function checkIf(){return parseInt(sessionStorage.getItem(currentMessageSetIndex))}
    function goDirection(direction) {  

      current = parseInt(currentMessageSetIndexNumber);
      newCurrent = direction === 'backwards' ? parseInt(current) - 1 : parseInt(current) + 1;
      sessionStorage.setItem(currentMessageSetIndex, newCurrent);
    }
  
    switch(currentButton) {
      case 'backwards':
        (checkIf(currentMessageSetIndexNumber) <= 1 ) ? ( $(this).prop('disabled', true) , console.log(currentMessageSetIndexNumber)) : console.log(currentMessageSetIndexNumber);
        (checkIf(currentMessageSetIndexNumber)  > 1 ) ? ( goDirection('backwards'), populateOutput(messagesArray), $(oppositeButton).prop('disabled', false) ) : goDirection('backwards');
        break;
      case 'forwards':
        (checkIf(currentMessageSetIndexNumber) >= indexLength) ? $(this).prop('disabled', true) : null;
      (checkIf(currentMessageSetIndexNumber) < indexLength ) ? (goDirection('forwards'),populateOutput(messagesArray),  $(oppositeButton).prop('disabled', false)) : goDirection('forwards');
        break;
  }
  });
  
