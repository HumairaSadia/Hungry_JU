const db = require("../config/db");

const Order = {

    async findById(orderId) {
        const [rows] = await db.execute(
            `
            SELECT
                id,
                student_id,
                shop_id,
                rider_id,
                status,
                delivery_hall,
                delivery_room,
                delivery_fee,
                total_amount,
                cancellation_reason,
                created_at,
                updated_at
            FROM orders
            WHERE id = ?
            LIMIT 1
            `,
            [orderId]
        );

        return rows[0] || null;
    },

    async updateStatus(orderId, status) {
        const [result] = await db.execute(
            `
            UPDATE orders
            SET status = ?
            WHERE id = ?
            `,
            [status, orderId]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        return this.findById(orderId);
    },

    async cancel(orderId, reason) {
        const [result] = await db.execute(
            `
            UPDATE orders
            SET
                status = 'Cancelled',
                cancellation_reason = ?
            WHERE id = ?
            `,
            [reason || null, orderId]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        return this.findById(orderId);
    }

};

module.exports = Order;