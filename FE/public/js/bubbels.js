let buttonsAdded = false;

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
    console.log('User bubble clicked');

    // create div with buttons
    if (!buttonsAdded) {
      const buttonContainer = $('<div>').addClass('button-container');
      const button1 = $('<button>').addClass('button').text('Button 1');
      const button2 = $('<button>').addClass('button').text('Button 2');
      const button3 = $('<button>').addClass('button').text('Button 3');
      const button4 = $('<button>').addClass('button').text('Button 4');
      buttonContainer.append(button1, button2, button3, button4);
      buttonContainer.insertBefore(outputMessage);
      buttonsAdded = true;
    } else {
      // if buttons already added, remove them
      $('.button-container').remove();
      buttonsAdded = false;
    }
  });
}

function assistantBubble(assistantResponseMessage) {
  $(assistantResponseMessage).addClass('assistant-bubble');
  const assistantoutputMessageContainer = $('<div>').addClass('assistant-bubble-container').append(assistantResponseMessage);
  $('#output-inner').append(assistantoutputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();
}


