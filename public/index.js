const socket = io();

const btnMessage = document.getElementById("btn-message");

btnMessage.addEventListener("click", (e) => {
  e.preventDefault();
  const messageInput = document.getElementById("message-input").value;
  const userName =
    document.getElementById("name-input").value || "desconhecido";
  if (messageInput) {
    socket.emit("message", { user: userName, text: messageInput });
    document.getElementById("message-input").value = "";
    document.getElementById("message-input").focus();
  }
});

socket.on("message", (msg) => {
  const li = document.createElement("li");
  li.textContent = `${msg.user}: ${msg.text}`;
  document.getElementById("messages").appendChild(li);
});

socket.on("connection", (msg) => {
  const li = document.createElement("li");
  li.textContent = `desconhecido entrou no chat`;
  document.getElementById("messages").appendChild(li);
});
