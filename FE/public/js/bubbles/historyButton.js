sessionStorage.setItem(`currentMessageSetIndex0` , 0)

$(document).on('click', '#backwards , #forwards', function() {
 
    const currentButton = $(this).attr('id')
    const currentContainer = $(this).closest('#user-bubble-container, #assistant-bubble-container')
    const oppositeButton = currentContainer.find('#backwards , #forwards')
  
    const messagesSetlocation = currentContainer.find('#user-bubble, #assistant-bubble');
    const messageSetIndex = messagesSetlocation.attr('data-messages');
    const sessionMessagesArray = `messageSets${messageSetIndex}`
    const currentMessageSetIndex = `currentMessageSetIndex${containerNumber}`
    const messageSets = JSON.parse(sessionStorage.getItem(`MessagesArrayCounter${containerNumber}`));
    
    const indexLength = messageSets.length 

    console.log(indexLength);


     messagesArray =  JSON.parse(sessionStorage.getItem(`MessagesArrayCounter${containerNumber}`))
     console.log(messagesArray);
    function populateOutput(messagesArray) {
      const outputArea = document.getElementById('output-inner');
      outputArea.innerHTML = '';
  

         messagesArray[containerNumber].messages.forEach((messages) => {
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
    }
    function checkIf(currentMessageSetIndex){return sessionStorage.getItem(currentMessageSetIndex)}
    function goDirection(direction) {
      current = sessionStorage.getItem(parseInt(currentMessageSetIndex));
      newCurrent = direction === 'backwards' ? current + 1 : current - 1;
      sessionStorage.setItem(currentMessageSetIndex, newCurrent);
      console.log(newCurrent);
    }
  
    switch(currentButton) {
      case 'backwards':
        (checkIf(currentMessageSetIndex)  >= 0 ) ? (goDirection('backwards'), populateOutput(messagesArray), $(oppositeButton).prop('disabled', false) ) : goDirection('backwards');
        (checkIf(currentMessageSetIndex) <= 0 ) ? $(this).prop('disabled', false) : null;
        break;
      case 'forwards':
      (checkIf(currentMessageSetIndex)  < indexLength) ? (goDirection('forwards'), populateConsole(messagesArray), $(oppositeButton).prop('disabled', false)) : goDirection('forwards');
      (checkIf(currentMessageSetIndex) >= indexLength) ? $(this).prop('disabled', true) : null;
        break;
  }
  });
  