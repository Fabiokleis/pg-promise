const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        req.body = user;
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = Auth;
