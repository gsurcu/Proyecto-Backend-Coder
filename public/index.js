const socket = io()

function sendMessage() {
  const hoy = new Date()
  const message = {
    mail: document.getElementById("nombreUsuario").value,
    text: document.getElementById("mensaje").value,
    fecha: hoy.toLocaleDateString() + ' ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
  };

  socket.emit("incomingMessage", message);
  document.getElementById("mensaje").value = "";
  document.getElementById("mensaje").focus();
}

socket.on("chat", messages => {
  const texto = messages.map( mensaje => {
    return(`
    <div>
      <strong>${mensaje.mail} </strong>
      [<>${mensaje.fecha}</>]
      <em>${mensaje.text}</em>
    </div>`);
  }).join(" ")

  console.log(texto);

  document.getElementById("messages").innerHTML = texto;
})