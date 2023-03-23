$(document).on('click', '#backwards , #forwards', function() {
    const currentButton = $(this).attr('id')
    const currentContainer = $(this).closest('#user-bubble-container, #assistant-bubble-container')
    const oppositeButton = currentContainer.find('#backwards , #forwards')
  
    const messagesSetlocation = currentContainer.find('#user-bubble, #assistant-bubble');
    const messageSetIndex = messagesSetlocation.attr('data-messages');
    console.log(messageSetIndex);
    const sessionMessagesArray = `messageSets${messageSetIndex}`
    const currentMessageSetIndex = `currentMessageSetIndex[${messageSetIndex}]`
    const messageSets = JSON.parse(sessionStorage.getItem(sessionMessagesArray));
    const indexLength = messageSets.length 
  
    function messagesArray() {return messageSets[sessionStorage.getItem(currentMessageSetIndex)]}
    function populateOutput() {
      const outputArea = document.getElementById('output-inner');
      outputArea.innerHTML = '';
  
         messagesArray = messagesArray()
         messagesArray.messages.forEach((messages) => {
        if (messages.role == 'user') {
          let a = false
          if(messages.childrens){
             a = true 
            }
          userBubble(messages.content, a);
        } else {
          if(messages.childrens){console.log(messages.childrens);}
          assistantBubble(messages.content);
        } 
      });
    }
    function populateConsole(){populateOutput()}
    function checkIf(currentMessageSetIndex){return sessionStorage.getItem(currentMessageSetIndex)}
    function goDirection(direction) {
      console.log(direction);
      current = sessionStorage.getItem(currentMessageSetIndex);
      console.log(current);
      if(direction === 'backwards'){
        console.log("mewo");
      }

      newCurrent = direction === 'backwards' ? current - 1 : current - 1;
      console.log(newCurrent);

      sessionStorage.setItem(currentMessageSetIndex, newCurrent);
    }
  
    switch(currentButton) {
      case 'backwards':
        (checkIf(currentMessageSetIndex)  > 0 ) ? (goDirection('backwards'), populateConsole(), $(oppositeButton).prop('disabled', false) ) : null;
        (checkIf(currentMessageSetIndex) <= 0 ) ? $(this).prop('disabled', true) : null;
        break;
      case 'forwards':
      (checkIf(currentMessageSetIndex)  < indexLength) ? (goDirection('forwards'), populateConsole(), $(oppositeButton).prop('disabled', false)) : null;
      (checkIf(currentMessageSetIndex) >= indexLength) ? $(this).prop('disabled', true) : null;
        break;
  }
  });
  