sessionStorage.setItem("currentMessageSetIndex", 0);

document.addEventListener("click", (event) => {
  if (event.target.id === "backwards" || event.target.id === "forwards") {
    navigateMessages(event.target.id);
  }
});

function navigateMessages(clickedButtonId) {
  const direction = clickedButtonId === "backwards" ? -1 : 1;
  const currentMessageSetIndex = parseInt(sessionStorage.getItem("currentMessageSetIndex"));
  const messagesArray = JSON.parse(sessionStorage.getItem("MessagesArrayCounter0"));
  const newIndex = currentMessageSetIndex + direction;


  if (newIndex >= 0 && newIndex <= messagesArray.length - 1) {
    sessionStorage.setItem("currentMessageSetIndex", newIndex);
    populateOutput(messagesArray[newIndex].messages);
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
