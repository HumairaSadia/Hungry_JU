const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {

    try {

        const header =
            req.headers.authorization;

        if (!header) {
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const token =
            header.startsWith("Bearer ")
                ? header.substring(7)
                : header;

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
}

module.exports = authenticate;