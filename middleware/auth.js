const jwt = require('jsonwebtoken');

const authenticationMiddleware = (req, res, next) => {
    console.log("Auth middleware")
    const token = req.headers['authorization'];
    console.log("token", token)
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });
};

module.exports = authenticationMiddleware;