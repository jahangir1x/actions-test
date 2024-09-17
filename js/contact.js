const messageArea = document.getElementById("messageArea");
const messageCounterText = document.getElementById("message-counter");
messageArea.addEventListener("input", updateMessageCounterText);

function updateMessageCounterText() {
    messageCounterText.innerHTML = messageArea.value.length + " characters";
}
