let userButtonsAdded = false;

function userBubble(message) {
  const outputMessageContainer = $('<div>').addClass('user-bubble-container');
  const outputMessage = $('<button>').addClass('user-bubble').text(message);
  outputMessageContainer.append(outputMessage);
  $('#output-inner').append(outputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();
  
  // add event listener to button
  outputMessage.on('click', function() {
  optionContainer(outputMessage)
  });
}

let assistantButtonsAdded = false;

function assistantBubble(assistantResponseMessage) {
  $(assistantResponseMessage).addClass('assistant-bubble');
  const assistantoutputMessageContainer = $('<div>').addClass('assistant-bubble-container').append(assistantResponseMessage);
  $('#output-inner').append(assistantoutputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();


  // add event listener to button
  $(assistantResponseMessage).on('click', function() {
    console.log('Assistant bubble clicked');

    // create div with buttons

    if (!assistantButtonsAdded) {
      const buttonContainer = $('<div>').addClass('button-container1');
      const button11 = $('<button>').addClass('button').text('Button 1');
      const button22 = $('<button>').addClass('button').text('Button 2');
      const button33 = $('<button>').addClass('button').text('Button 3');
      const button44 = $('<button>').addClass('button').text('Button 4');
      buttonContainer.append(button11, button22, button33, button44);
      buttonContainer.insertAfter($(assistantResponseMessage));
      assistantButtonsAdded = true;
    } else {
      // if buttons already added, remove them
      $('.button-container1').remove();
      assistantButtonsAdded = false;
    }
  });


  
}


