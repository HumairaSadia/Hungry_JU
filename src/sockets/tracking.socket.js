function initializeTrackingSocket(io) {

    io.on("connection", (socket) => {

        console.log(
            `Client connected: ${socket.id}`
        );


        socket.on(
            "join-order",
            (orderId) => {

                if (!orderId) {
                    return;
                }

                const room =
                    `order:${orderId}`;

                socket.join(room);

                console.log(
                    `Socket ${socket.id} joined ${room}`
                );

            }
        );


        socket.on(
            "leave-order",
            (orderId) => {

                if (!orderId) {
                    return;
                }

                socket.leave(
                    `order:${orderId}`
                );

            }
        );


        socket.on(
            "disconnect",
            () => {

                console.log(
                    `Client disconnected: ${socket.id}`
                );

            }
        );

    });

}


module.exports =
    initializeTrackingSocket;