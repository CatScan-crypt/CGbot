
  function optionContainer(outputMessage){

    if (!userButtonsAdded) {
      const buttonContainer = $('<div>').addClass('button-container');
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

