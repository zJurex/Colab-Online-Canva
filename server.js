const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("Un usuario se conectó");

    socket.on("draw", (data) => {
    // reenviar a TODOS (incluido el que lo mandó)
    io.emit("draw", data);
  });

    socket.on("disconnect", () => {
        console.log("Un usuario se desconectó");
    });
});

http.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});
