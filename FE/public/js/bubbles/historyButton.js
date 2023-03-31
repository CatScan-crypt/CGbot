// Set initial value for currentMessageSetIndex
sessionStorage.setItem("currentMessageSetIndex", 0);

// Event listener for the click event on navigation buttons
document.addEventListener("click", (event) => {
  if (event.target.id === "backwards" || event.target.id === "forwards") {
    navigateMessages(event.target.id);
  }
});

function navigateMessages(clickedButtonId) {
  // Determine the direction for navigation based on the clicked button's ID
  const direction = clickedButtonId === "backwards" ? -1 : 1;

  // Retrieve the current message set index from session storage and parse it as an integer
  const currentMessageSetIndex = parseInt(sessionStorage.getItem("currentMessageSetIndex"));

  // Retrieve the messages array from session storage and parse it as a JSON object
  const messagesArray = JSON.parse(sessionStorage.getItem("MessagesArrayCounter0"));

  // Calculate the new index by adding the direction value to the current message set index
  const newIndex = currentMessageSetIndex + direction;

  // Check if the new index is within the bounds of the messages array
  if (newIndex >= 0 && newIndex <= messagesArray.length - 1) {
    // Update the current message set index in session storage with the new index value
    sessionStorage.setItem("currentMessageSetIndex", newIndex);

    // Populate the output area with messages from the message set at the new index
    populateOutput(messagesArray[newIndex].messages);

    // Update the disabled state of the navigation buttons based on the new index
    updateButtonDisabledState("backwards", newIndex <= 0);
    updateButtonDisabledState("forwards", newIndex >= messagesArray.length - 1);
  }
}

function populateOutput(messages) {
  const outputArea = document.getElementById("output-inner");
  outputArea.innerHTML = "";

  messages.forEach((message) => {
    const hasChildren = message.childrens || false;
    if (message.role === "user") {
      addBubble(message.content, message.role, hasChildren);
    } else {
      assistantBubble(message.content, message.role, hasChildren);
    }
  });
}

function updateButtonDisabledState(buttonId, isDisabled) {
  const button = document.getElementById(buttonId);
  button.disabled = isDisabled;
}
