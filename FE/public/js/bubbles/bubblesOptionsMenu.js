function optionContainer(outputMessage, type) {
  const buttonsContainer = $(`<div class="${type}-options-container" id="${type}-options-container" data-messages="${outputMessage.attr('data-messages')}">`);
  const messageEditButton = $('<button>', { class: 'button', id: `${type}-message-edit`, text: 'Edit' });
  const messageCopyButton = $('<button>', { class: 'button', id: `${type}-message-copy`, text: 'Copy' });
  const messageElysiumButton = $('<button>', { class: 'button', id: `${type}-message-elysium`, text: 'Elysium' });
  const messageIndexerButton = $('<button>', { class: 'button', id: `${type}-message-indexer`, text: 'Indexer' });
  buttonsContainer.append(messageEditButton, messageCopyButton, messageElysiumButton, messageIndexerButton);
  if (type === 'user') {
    buttonsContainer.insertBefore(outputMessage);
    userButtonsAdded = true;
    userMessageCopy(outputMessage);
  } else if (type === 'assistant') {
    buttonsContainer.insertAfter(outputMessage);
    assistantButtonsAdded = true;
    assistantMessageCopy(outputMessage);
  }
  else {
    throw new Error('Invalid type parameter. Must be either "user" or "assistant".');
  }
  if (type === 'user') {
    if (!userButtonsAdded) {
      // if buttons already added, remove them
      $('.user-options-container').remove();
      userButtonsAdded = false;
    }
  } else if (type === 'assistant') {
    if (!assistantButtonsAdded) {
      // if buttons already added, remove them
      $('.assistant-options-container').remove();
      assistantButtonsAdded = false;
    }
  }
}
