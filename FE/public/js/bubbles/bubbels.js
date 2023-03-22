let messageCount = -1; // Initialize message counter

let userButtonsAdded = false;

let assistantButtonsAdded = false;

function userBubble(message, addbuttons) {
  messageCount++; // Increment message counter
  const userOutputMessageContainer = $('<div>').addClass('user-bubble-container');
  userOutputMessageContainer.attr('id', 'user-bubble-container');
  const userOutputMessage = $('<button>').addClass('user-bubble').text(message);
  userOutputMessage.attr('id', 'user-bubble');
  userOutputMessageContainer.append(userOutputMessage);
  userOutputMessage.attr('data-messages', messageCount);
  userOutputMessageContainer.attr('data-messages', messageCount);
  const backwards = $('<button>').text('->').attr('id', 'backwards'); 
  const forwards = $('<button>').text('<-').attr('id', 'forwards');
  
  if(addbuttons==true){
    userOutputMessageContainer.append(forwards)
    userOutputMessageContainer.append(backwards)
  }
  $('#output-inner').append(userOutputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();

  // Event listener to open option menu
  userOutputMessage.on('click', function() {
    userOptionContainer(userOutputMessage , "user")
  });
}

function assistantBubble(assistantResponseMessage) {
  messageCount++; // Increment message counter
  const assistantoutputMessageContainer = $('<div>').addClass('assistant-bubble-container').append(assistantResponseMessage);
  assistantoutputMessageContainer.attr('id', 'assistant-bubble-container');
  $(assistantResponseMessage).addClass('assistant-bubble')
  $(assistantResponseMessage).attr('id', 'assistant-bubble');
  // Add data-messages attribute with current message count
  $(assistantResponseMessage).attr('data-messages', messageCount);
  assistantoutputMessageContainer.attr('data-messages', messageCount);
  $('#output-inner').append(assistantoutputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();

  // Event listener to open option menu
  $(assistantResponseMessage).on('click', function() {
    assistantOptionContainer($(assistantResponseMessage))
  });
}

