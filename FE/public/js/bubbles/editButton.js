// function sendEditToServer(numberTosend,newText){
  // sendMessageIndex(numberTosend,newText)
  // }
  // const numberToSend = optionsContainer.attr('data-messages');



$(document).on('click', '#user-message-edit, #assistant-message-edit', function() {
  const optionsContainer = $(this).closest('[id$="-options-container"]');
  const divToEdit = optionsContainer.siblings('[id$="-bubble"]');
  enableEditMode(divToEdit);
  optionsContainer.remove();
});

  // Replace the div content with an input element that contains the current text
function enableEditMode(divToEdit) {

  saveMessages(divToEdit);
  const currentText = divToEdit.text();
  const inputElement = $('<input>').val(currentText);
  divToEdit.empty().append(inputElement);

  // Create cancel and approve buttons
  const cancelButton = $('<button>').text('Cancel');
  const approveButton = $('<button>').text('Approve');
  const backwards = $('<button>').text('->').attr('id', 'backwards'); 
  const forwards = $('<button>').text('<-').attr('id', 'forwards');

  // When the user clicks the "Cancel" button, disable the edit mode
  cancelButton.on('click', () => {
    saveChanges(divToEdit, currentText);
  });

  // When the user clicks the "Approve" button, update the div content with the new text and disable the edit mode
  approveButton.on('click', () => {

    const newText = inputElement.val();
    divToEdit.text(newText);
    saveChanges(divToEdit, newText);
    if (!divToEdit.parent().find('#backwards').length) {
      divToEdit.parent().append(forwards);
      divToEdit.parent().append(backwards)
    }
    // Call this function before removing the divs
    divToEdit.parent().nextAll().remove();
  });
  
  // Append the buttons to the div
  divToEdit.append(cancelButton);
  divToEdit.append(approveButton);
  inputElement.focus().select();
}
  // Replace the input element and buttons with a regular div that contains the new text
function saveChanges(divToEdit, newText) {

  const newDivElement = $('<div>').text(newText);
  divToEdit.empty().append(newDivElement);
}


  // Get the container ID and role from the container element
  function saveMessages(divToEdit) {
    // Get the messages from all subsequent containers with the same role
    const messages = [];
    const fatherBubble = divToEdit.attr('data-messages');
    const id = divToEdit.attr('id');
    const role = id.split('-')[0];
    const content = divToEdit[0].innerText
    messages.push({ father: fatherBubble, childrens: true, role: role, content: content });

    divToEdit.parent().nextAll().each(function () {
      const id = $(this).attr('id');
      const role = id.split('-')[0];
      const messageText = this.innerText.trim();
      messages.push({ father: fatherBubble, role: role, content: messageText });
    });
    let currentContainerArrayIndex = divToEdit.attr('data-messages');
    const messageSetsKey = `MessagesArrayCounter${currentContainerArrayIndex}`;
    let messageSets = JSON.parse(sessionStorage.getItem(messageSetsKey)) || [];
  
    // Update the messageSets array with the merged messages
    messageSets.push({ messages: messages });
  
    // Store the updated messageSets array in sessionStorage
    sessionStorage.setItem(messageSetsKey, JSON.stringify(messageSets));
  
    // Log the saved content to the console
    console.log('All saved content:', messageSets);
  }
