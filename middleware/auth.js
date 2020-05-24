const jwt = require('jsonwebtoken');

const authenticateRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Invalid token');
            }

            req.user = user;
            next();
        })
    } else {
        return res.sendStatus(401);
    }
}

module.exports = authenticateRoute;

