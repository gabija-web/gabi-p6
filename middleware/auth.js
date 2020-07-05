const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        console.log(token)
        // const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'gfdg5fd64g5f4gf6d4f6cds456fc4ds6f4csdd');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request')
        });
    }
};