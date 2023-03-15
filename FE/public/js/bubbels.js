
function userBubble(message){
  const outputMessageContainer = $('<div>').addClass('user-bubble-container');
  const outputMessage = $('<div>').addClass('user-bubble').text(message);
  outputMessageContainer.append(outputMessage);
  $('#output-inner').append(outputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();
}


function assistantBubble(assistantResponseMessage) {
  $(assistantResponseMessage).addClass('assistant-bubble');
  const assistantoutputMessageContainer = $('<div>').addClass('assistant-bubble-container').append(assistantResponseMessage);
  $('#output-inner').append(assistantoutputMessageContainer);
  $('#input').val('');
  $('#input').focus();
}
