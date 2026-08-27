let ioInstance = null;


function setIO(io) {
    ioInstance = io;
}


function emitOrderStatus(
    orderId,
    order
) {

    if (!ioInstance) {
        return;
    }

    ioInstance
        .to(`order:${orderId}`)
        .emit(
            "order-status-updated",
            {
                orderId,
                status: order.status,
                updatedAt: order.updated_at
            }
        );
}


module.exports = {
    setIO,
    emitOrderStatus
};