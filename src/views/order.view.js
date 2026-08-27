function toJSON(order) {

    return {
        id: order.id,

        studentId: order.student_id,

        shopId: order.shop_id,

        riderId: order.rider_id,

        status: order.status,

        delivery: {
            hall: order.delivery_hall,
            room: order.delivery_room
        },

        deliveryFee: order.delivery_fee,

        totalAmount: order.total_amount,

        cancellationReason:
            order.cancellation_reason,

        createdAt: order.created_at,

        updatedAt: order.updated_at
    };
}


function tracking(trackingData) {

    return {
        success: true,

        data: trackingData
    };
}


module.exports = {
    toJSON,
    tracking
};