import express from "express";
import { connect } from "mqtt";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // This should match the client's origin
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const port = 3000;
app.use(cors());
// Connect to an MQTT broker
const mqttClient = connect("mqtt://192.168.1.123:1883"); // 127.0.0.1

mqttClient.on("connect", function () {
  // Once connected, subscribe to a topic
  mqttClient.subscribe("esp32One");
  mqttClient.subscribe("esp32One/motion/detect");
  mqttClient.subscribe("esp32One/led/brightness");

  mqttClient.subscribe("esp32Two");
  mqttClient.subscribe("esp32Two/motion/detect");
});

// MQTT message event handler
mqttClient.on("message", function (topic, message) {
  if (topic === "esp32One") {
    console.log(message.toString());
  }

  if (topic === "esp32One/motion/detect") {
    console.log(message.toLocaleString());
    io.sockets.emit("esp32One/motion/detect", message.toString());
  }

  if (topic === "esp32One/led/brightness") {
    io.sockets.emit("esp32One/led/brightness", message.toString());
  }
});

io.on("connection", (socket) => {
  console.log("New client connected!");

  socket.on("control", (msg) => {
    console.log(`Control message received : ${msg}`);
    mqttClient.publish("test/topic", msg);

    io.sockets.emit("control", msg);
  });

  // setInterval(() => {
  //   socket.emit("receive-notification", "Hello! This is a notification.");
  //   console.log("emit");
  // }, 10000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/", (req, res) => {
  res.send({ message: "server connection success!" });
});

server.listen(port, "192.168.1.123", () => {
  console.log(`Example app listening at port:${port}`);
});
