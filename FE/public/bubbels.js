function userBubble(message){
    const outputMessageContainer = document.createElement('div');
    outputMessageContainer.classList.add('user-bubble-container');
    const outputMessage = document.createElement('div');
    outputMessage.classList.add('user-bubble');
    outputMessage.innerText = message;
    outputMessageContainer.appendChild(outputMessage);
    userOutput.appendChild(outputMessageContainer);
    input.value = '';
    input.focus();
  }

//   function assistantBubble(message){

//     const outputMessageContainer1 = document.createElement('div');
//     outputMessageContainer1.classList.add('assistant-bubble-container');
//     const responseMessage = document.createElement('div');
//     responseMessage.classList.add('assistant-bubble');
//     responseMessage.innerText = message;
//     outputMessageContainer1.appendChild(responseMessage);
//     assistantOutput.appendChild(outputMessageContainer1);
//     input.value = '';
//     input.focus();
//     } 