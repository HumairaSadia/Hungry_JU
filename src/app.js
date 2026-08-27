const express = require("express");
const cors = require("cors");

const orderRoutes =
    require("./routes/order.routes");

const errorHandler =
    require("./middlewares/errorHandler");

const app = express();


// Middleware
app.use(cors());

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true
    })
);


// Health check
app.get(
    "/health",
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Hungry_JU API is running"
        });

    }
);


// API routes
app.use(
    "/api/v1",
    orderRoutes
);


// Error handler
app.use(errorHandler);


module.exports = app;