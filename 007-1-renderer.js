let port1 = null;
window.channel.initPort1((port) => {
  port1 = port;
  console.log(port1);
});

document.getElementById("send-message").onclick = () => {
  console.log("send-message");
  window.channel.sendMessageToB("Hello from A!");
};
