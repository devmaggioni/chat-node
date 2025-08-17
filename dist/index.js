"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = __importDefault(require("node:http"));
const node_path_1 = __importDefault(require("node:path"));
const socket_io_1 = require("socket.io");
class App {
    app;
    http;
    io;
    constructor() {
        this.app = (0, express_1.default)();
        this.http = node_http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.http);
        this.app.use(express_1.default.static(node_path_1.default.join(__dirname, "../public"))); // <-- serve arquivos estáticos
        this.listenSocket();
        this.setupRoutes();
    }
    listenServer() {
        this.http.listen(3000, () => {
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
            res.sendFile(node_path_1.default.join(__dirname, "../public/index.html"));
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
