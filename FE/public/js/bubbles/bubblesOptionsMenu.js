let userButtonsAdded = false;
let assistantButtonsAdded = false;
let buttonsAdded = false

function optionContainer(message, role) {
  
  const optionsContainerClass = `${role}-options-container`;
  const optionsContainerId = `${role}-options-container`;

  if (!buttonsAdded) {

    function createOptionButtons(text, id) {
      return $('<button>')
        .addClass('button')
        .text(text)
        .attr('id', id);
    }

    const buttonData = [
      {text: 'Edit', id: `${role}-message-edit`},
      {text: 'Copy', id: `${role}-message-copy`},
      {text: 'Elysium', id: `${role}-message-elysium`},
      {text: 'Indexer', id: `${role}-message-indexer`}
    ];
    const buttons = buttonData.map(data => createOptionButtons(data.text, data.id));
    
    const buttonContainer = $('<div>')
      .addClass(optionsContainerClass)
      .attr('id', optionsContainerId)
      .attr('data-messages', message.attr('data-messages'));

    buttonContainer.append(buttons);
    buttonContainer.append(
      buttons
    );

    if (role === 'user') {
  buttonContainer.insertBefore(message);
  buttonsAdded = true
  userButtonsAdded = true;
  messageCopy( `#${role}-message-copy`, message);
  
} else if (role === 'assistant') {
  buttonContainer.insertAfter(message);
  buttonsAdded = true
  assistantButtonsAdded = true;
  messageCopy( `#${role}-message-copy`, message);
}
} else {
$(`.${optionsContainerClass}`).remove();
if (role === 'user') {
  buttonsAdded = false
  userButtonsAdded = false;
} else if (role === 'assistant') {
  buttonsAdded = false
  assistantButtonsAdded = false;
}
}
}