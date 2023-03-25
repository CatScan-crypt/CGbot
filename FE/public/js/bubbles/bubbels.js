// let containerNumber = -1; // Initialize message counter

// sessionStorage.setItem("containerNumber" , 0)

function addBubble(message, sender , addbuttons) {
  containerNumber = parseInt(sessionStorage.getItem("containerNumber")) || '0';


  if(!sessionStorage.getItem(`MessagesArrayCounter${containerNumber }`)){
  +sessionStorage.setItem(`MessagesArrayCounter${containerNumber}` , containerNumber)  
  }

  containerNumber++;

  +sessionStorage.setItem("containerNumber" , containerNumber)
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
  bubble.attr('data-messages', containerNumber - 1);
  bubbleContainer.attr('data-messages', containerNumber) - 1;
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

