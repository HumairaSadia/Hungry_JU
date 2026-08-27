const {
    emitOrderStatus
} = require("../sockets/trackingEmitter");  
const Order = require("../models/Order");
const {
    NotFoundError,
    ConflictError,
    ValidationError
} = require("../utils/errors");

const ALLOWED_STATUSES = [
    "Placed",
    "Preparing",
    "Ready",
    "PickedUp",
    "Delivered",
    "Cancelled"
];

const STATUS_FLOW = {
    Placed: ["Preparing", "Cancelled"],
    Preparing: ["Ready", "Cancelled"],
    Ready: ["PickedUp"],
    PickedUp: ["Delivered"],
    Delivered: [],
    Cancelled: []
};

async function getOrderTracking(orderId, studentId) {

    if (!orderId) {
        throw new ValidationError("Order ID is required");
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError("Order not found");
    }

    if (
        studentId &&
        String(order.student_id) !== String(studentId)
    ) {
        throw new NotFoundError("Order not found");
    }

    return {
        orderId: order.id,

        status: order.status,

        tracking: {
            placed: {
                completed: true
            },

            preparing: {
                completed: [
                    "Ready",
                    "PickedUp",
                    "Delivered"
                ].includes(order.status)
            },

            ready: {
                completed: [
                    "Ready",
                    "PickedUp",
                    "Delivered"
                ].includes(order.status)
            },

            pickedUp: {
                completed: [
                    "PickedUp",
                    "Delivered"
                ].includes(order.status)
            },

            delivered: {
                completed: order.status === "Delivered"
            }
        },

        delivery: {
            hall: order.delivery_hall,
            room: order.delivery_room,
            riderId: order.rider_id
        },

        createdAt: order.created_at,
        updatedAt: order.updated_at
    };
}


async function updateOrderStatus(
    orderId,
    newStatus,
    actorId
) {

    if (!orderId) {
        throw new ValidationError("Order ID is required");
    }

    if (!ALLOWED_STATUSES.includes(newStatus)) {
        throw new ValidationError(
            `Invalid order status: ${newStatus}`
        );
    }

    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError("Order not found");
    }

    const allowedNextStatuses =
        STATUS_FLOW[order.status] || [];

    if (!allowedNextStatuses.includes(newStatus)) {
        throw new ConflictError(
            `Order cannot move from ${order.status} to ${newStatus}`
        );
    }

    const updatedOrder =
        await Order.updateStatus(
            orderId,
            newStatus
        );

    return updatedOrder;
}


async function cancelOrder(
    orderId,
    studentId,
    reason
) {

    const order = await Order.findById(orderId);

    if (!order) {
        throw new NotFoundError("Order not found");
    }

    if (
        studentId &&
        String(order.student_id) !== String(studentId)
    ) {
        throw new NotFoundError("Order not found");
    }

    const cancellableStatuses = [
        "Placed",
        "Preparing"
    ];

    if (!cancellableStatuses.includes(order.status)) {
        throw new ConflictError(
            `Order cannot be cancelled when status is ${order.status}`
        );
    }

    return Order.cancel(orderId, reason);
}


module.exports = {
    getOrderTracking,
    updateOrderStatus,
    cancelOrder
};

const updatedOrder =
    await Order.updateStatus(
        orderId,
        newStatus
    );

emitOrderStatus(
    orderId,
    updatedOrder
);

return updatedOrder;