const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        err.statusCode = 400;
        next(err);
    }
}

module.exports = Auth;
