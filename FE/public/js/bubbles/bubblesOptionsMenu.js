
  function userOptionContainer(userOutputMessage){
    if (!userButtonsAdded) {
      // create an options div with buttons
      const userButtonContainer = $('<div>').addClass('user-options-container').attr('id', 'user-options-container');
      userButtonContainer.attr('data-messages', userOutputMessage.attr('data-messages'));
      const userMessageEditButton = $('<button>').addClass('button').text('Edit').attr('id', 'user-message-edit');
      const userMessageCopyButton = $('<button>').addClass('button').text('Copy').attr('id', 'user-message-copy');
      const userMessageElysiumButton = $('<button>').addClass('button').text('Elysium').attr('id', 'user-message-elysium');
      const userMessageIndexerButton = $('<button>').addClass('button').text('Indexer').attr('id', 'user-message-indexer');
      userButtonContainer.append(userMessageEditButton,userMessageCopyButton , userMessageElysiumButton, userMessageIndexerButton);
      userButtonContainer.insertBefore(userOutputMessage);
      userButtonsAdded = true;
      userMessageCopy(userOutputMessage)

      //Untill here 
    } else {
      // if buttons already added, remove them
      $('.user-options-container').remove();
      userButtonsAdded = false;
    }
  }


  function assistantOptionContainer(assistantResponseMessage){
      // create an options div with buttons
      if (!assistantButtonsAdded) {
        const assistantButtonContainer = $('<div>').addClass('assistant-options-container').attr('id', 'assistant-options-container')
        assistantButtonContainer.attr('data-messages', assistantResponseMessage.attr('data-messages'));
        const assistantMessageCopyButton = $('<button>').addClass('button').text('Copy').attr('id', 'assistant-message-copy');
        const assistantMessageEditButton = $('<button>').addClass('button').text('Edit').attr('id', 'assistant-message-edit');
        const assistantMessageElysiumButton = $('<button>').addClass('button').text('Elysium').attr('id', 'assistant-message-elysium');
        const assistantMessageIndexerButton = $('<button>').addClass('button').text('Indexer').attr('id', 'assistant-message-indexer');
        assistantButtonContainer.append(assistantMessageCopyButton, assistantMessageEditButton, assistantMessageElysiumButton, assistantMessageIndexerButton);
        assistantButtonContainer.insertAfter(assistantResponseMessage);
        assistantButtonsAdded = true;
        assistantMessageCopy(assistantResponseMessage)
      } else {
        // if buttons already added, remove them
        $('.assistant-options-container').remove();
        assistantButtonsAdded = false;
      }
    }


 