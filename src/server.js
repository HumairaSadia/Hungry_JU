require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

const initializeTrackingSocket =
    require("./sockets/tracking.socket");

const PORT =
    process.env.PORT || 5000;

const server =
    http.createServer(app);

const io =
    new Server(server, {

        cors: {
            origin: "*",
            methods: [
                "GET",
                "POST",
                "PATCH"
            ]
        }

    });

initializeTrackingSocket(io);

server.listen(
    PORT,
    () => {

        console.log(
            `Hungry_JU server running on port ${PORT}`
        );

    }
);