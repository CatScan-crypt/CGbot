sessionStorage.clear()


//needs refactoring 
function messageCopy(selector, message) {
  const messageButton = $(selector);
  messageButton.on('click', function() {
    const text = message[0].innerText;
    navigator.clipboard.writeText(text)
      .then(() => console.log('Text copied to clipboard:', text));
  });
}