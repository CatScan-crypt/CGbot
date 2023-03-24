let containerNumber = 0; // Initialize message counter
+sessionStorage.setItem("MessagesArrayCounter[0]" , null)

function addBubble(message, sender , addbuttons) {
  containerNumber++;
  if(!sessionStorage.getItem(`MessagesArrayCounter${containerNumber}`)){
  +sessionStorage.setItem(`MessagesArrayCounter${containerNumber}` , containerNumber)
  console.log(  sessionStorage.getItem(`MessagesArrayCounter${containerNumber}`))
  }
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
  bubble.attr('data-messages', containerNumber);
  bubbleContainer.attr('data-messages', containerNumber);
  $('#output-inner').append(bubbleContainer);
  $('#input').val('');
  $('#input').focus();
  updateScrollbar();

  // Event listener to open option menu
  if (sender === 'user') {
    bubble.on('click', function() {
      optionContainer(bubble,sender);
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

