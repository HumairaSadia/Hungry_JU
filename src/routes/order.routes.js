const express = require("express");

const trackingController =
    require("../controllers/tracking.controller");

const authenticate =
    require("../middlewares/authMiddleware");

const router = express.Router();


// Get order tracking
router.get(
    "/orders/:orderId/tracking",
    authenticate,
    trackingController.getTracking
);


// Update order status
router.patch(
    "/orders/:orderId/status",
    authenticate,
    trackingController.updateStatus
);


// Cancel order
router.patch(
    "/orders/:orderId/cancel",
    authenticate,
    trackingController.cancelOrder
);


module.exports = router;