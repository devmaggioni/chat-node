import express, { Application } from "express";
import http from "node:http";
import path from "node:path";
import { Server } from "socket.io";

class App {
  private app: Application;
  private http: http.Server;
  private io: Server;

  constructor() {
    this.app = express();
    this.http = http.createServer(this.app);
    this.io = new Server(this.http);

    this.app.use(express.static(path.join(__dirname, "../public"))); // <-- serve arquivos estáticos

    this.listenSocket();
    this.setupRoutes();
  }

  listenServer() {
    this.http.listen(process.env.PORT || 3000, () => {
      console.log("Server is running");
    });
  }

  listenSocket() {
    this.io.on("connection", (socket) => {
      console.log("user connected => ", socket.id);
      this.io.emit("connection", "connected");
      socket.on("message", (msg) => {
        this.io.emit("message", msg);
      });
    });
  }

  setupRoutes() {
    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  }
}

const app = new App();
app.listenServer();

// const app = new App();
// app.listenServer();

// import Fastify from "fastify";
// import { Server } from "socket.io";

// const fastify = Fastify();
// const server = fastify.server;
// const io = new Server(server);

// fastify.get("/", async () => {
//   return { message: "Hello from Fastify" };
// });

// io.on("connection", (socket) => {
//   console.log("Novo cliente conectado:", socket.id);
//   socket.emit("welcome", "Bem-vindo ao Socket.IO com Fastify!");
// });

// const start = async () => {
//   try {
//     await fastify.listen({ port: 3000 });
//     console.log("🚀 Server running on http://localhost:3000");
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// start();
