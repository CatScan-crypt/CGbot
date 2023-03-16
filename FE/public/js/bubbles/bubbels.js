let userButtonsAdded = false;
function userBubble(message) {
  const outputMessageContainer = $('<div>').addClass('user-bubble-container');
  const outputMessage = $('<button>').addClass('user-bubble').text(message);
  outputMessageContainer.append(outputMessage);
  $('#output-inner').append(outputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();

  //event listener to open option menu
  outputMessage.on('click', function() {
  userOptionContainer(outputMessage)
  });
}

let assistantButtonsAdded = false;
function assistantBubble(assistantResponseMessage) {
  const assistantoutputMessageContainer = $('<div>').addClass('assistant-bubble-container').append(assistantResponseMessage);
  $(assistantResponseMessage).addClass('assistant-bubble');
  $('#output-inner').append(assistantoutputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();

  //event listener to open option menu
  $(assistantResponseMessage).on('click', function() {
    assistantOptionContainer($(assistantResponseMessage))
  });
}


