const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

btn1.addEventListener("click", async () => {
  window.bridge.sendPortToMain((data) => {
    console.log("渲染进程：", data);
  });
});

btn2.addEventListener("click", () => {
  window.bridge.sendMessageToMain("我是渲染进程通过 port2 发送过来的消息");
});
