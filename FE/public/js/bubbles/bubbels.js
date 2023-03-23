let messageCount = -1; // Initialize message counter

let userButtonsAdded = false;

let assistantButtonsAdded = false;


function addBubble(message, sender , addbuttons) {
  messageCount++; // Increment message counter
  const bubbleContainer = $('<div>').addClass(`${sender}-bubble-container`);
  bubbleContainer.attr('id', `${sender}-bubble-container`);
  
  let bubble;
  if (sender === 'user') {
    bubble = $('<button>').addClass(`${sender}-bubble`).text(message);
    bubble.attr('id', `${sender}-bubble`);
  } else {
    bubble = $('<div>').append(message)
   bubble.attr('id', `${sender}-bubble`);
  }
  
  bubbleContainer.append(bubble);
  bubble.attr('data-messages', messageCount);
  bubbleContainer.attr('data-messages', messageCount);
  $('#output-inner').append(bubbleContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();

  // Event listener to open option menu
  if (sender === 'user') {
    bubble.on('click', function() {
      userOptionContainer(bubble);
    });
  } else {
    bubble.on('click', function() {
      assistantOptionContainer(bubble)
  })
}

if(addbuttons){
  const backwards = $('<button>').text('->').attr('id', 'backwards'); 
  const forwards = $('<button>').text('<-').attr('id', 'forwards');
  bubbleContainer.append(forwards)
  bubbleContainer.append(backwards)
}

}

