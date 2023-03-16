let messageCount = 0; // Initialize message counter

let userButtonsAdded = false;

let assistantButtonsAdded = false;

function userBubble(message) {
  messageCount++; // Increment message counter
  const outputMessageContainer = $('<div>').addClass('user-bubble-container');
  const outputMessage = $('<button>').addClass('user-bubble').text(message);
  outputMessageContainer.append(outputMessage);

  // Add data-messages attribute with current message count
  outputMessage.attr('data-messages', messageCount);

  $('#output-inner').append(outputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();

  // Event listener to open option menu
  outputMessage.on('click', function() {
    userOptionContainer(outputMessage , "user")
  });
}

function assistantBubble(assistantResponseMessage) {
  messageCount++; // Increment message counter
  const assistantoutputMessageContainer = $('<div>').addClass('assistant-bubble-container').append(assistantResponseMessage);
  $(assistantResponseMessage).addClass('assistant-bubble')

  // Add data-messages attribute with current message count
  $(assistantResponseMessage).attr('data-messages', messageCount);

  $('#output-inner').append(assistantoutputMessageContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();

  // Event listener to open option menu
  $(assistantResponseMessage).on('click', function() {
    assistantOptionContainer($(assistantResponseMessage))
  });
}

