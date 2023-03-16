
  function userOptionContainer(outputMessage){

    if (!userButtonsAdded) {
      const buttonContainer = $('<div>').addClass('user-options-container');
      const userMessageEditButton = $('<button>').addClass('button').text('Edit').attr('id', 'user-message-edit');
      const userMessageCopyButton = $('<button>').addClass('button').text('Copy').attr('id', 'user-message-copy');
      const userMessageElysiumButton = $('<button>').addClass('button').text('Elysium').attr('id', 'user-message-elysium');
      const userMessageIndexerButton = $('<button>').addClass('button').text('Indexer').attr('id', 'user-message-indexer');
      buttonContainer.append(userMessageEditButton,userMessageCopyButton , userMessageElysiumButton, userMessageIndexerButton);
      buttonContainer.insertBefore(outputMessage);
      userButtonsAdded = true;
      userMessageCopy(outputMessage)

    } else {
      // if buttons already added, remove them
      $('.button-container').remove();
      userButtonsAdded = false;
    }
  }



  function assistantOptionContainer(assistantResponseMessage){
      // create div with buttons
      if (!assistantButtonsAdded) {
        const buttonContainer = $('<div>').addClass('assistant-options-container');
        const assistantMessageEditButton = $('<button>').addClass('button').text('Edit').attr('id', 'assistant-message-edit');
        const assistantMessageCopyButton = $('<button>').addClass('button').text('Copy').attr('id', 'assistant-message-copy');
        const assistantMessageElysiumButton = $('<button>').addClass('button').text('Elysium').attr('id', 'assistant-message-elysium');
        const assistantMessageIndexerButton = $('<button>').addClass('button').text('Indexer').attr('id', 'assistant-message-indexer');
        buttonContainer.append(assistantMessageEditButton, assistantMessageCopyButton, assistantMessageElysiumButton, assistantMessageIndexerButton);
        buttonContainer.insertAfter(assistantResponseMessage);
        assistantButtonsAdded = true;
      } else {
        // if buttons already added, remove them
        $('.assistant-options-container').remove();
        assistantButtonsAdded = false;
      }
    }