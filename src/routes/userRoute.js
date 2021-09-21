const express = require('express');
const router = express.Router();
const UserService = require('../service/userService.js');
const UserValidation = require('../validation/user.js');
const Auth = require('../service/authService.js');

router.get('/:id', express.urlencoded({ extended: true }), async (req, res, next) => {
    try {
        const id = await UserValidation.userId(req.params);
        const user = await UserService.getUser(id);
        res.status(200).json(user);
    } catch(err) {
        err.statusCode = 404;
        next(err);
    }
});

router.post('/', express.json(), async (req, res, next) => {
    try {
        const data = await UserValidation.createUser(req.body);
        const user = await UserService.createUser(data);
        res.status(201).json(user);
    } catch(err) {
        err.statusCode = 400;
        next(err);
    }
});

router.post('/login', express.json(), async (req, res, next) => {
    try {
        const data = await UserValidation.loginUser(req.body);
        const user = await UserService.verifyEmail(data);
        const flag = user.some(e => e.email == data.email);

        if (flag) {     
            const Authorization = await UserService.loginUser(data, user);
            res.header({ Authorization });
            res.status(200).json({ message: 'success login!'});
        } else { 
            throw new Error('email or password wrong');
        } 

    } catch(err) {
        err.statusCode = 400;
        next(err);
    }
});

router.put('/', Auth, express.urlencoded({ extended: true }), async (req, res, next) => {
    try {
        const decoded = await UserValidation.jwtUserDecoded(req.user);
        const name = await UserValidation.UserName(req.query);
        const flag = await UserService.verifyIfNameExist(name);
        if (!flag.length) {
            const user = await UserService.updateUserName(decoded.id, name);
            res.status(200).json({ user });

        } else {
            throw new Error('name already exists!');
        }

    } catch(err) {
        err.statusCode = 400;
        next(err);
    }
});

router.delete('/', Auth, async (req, res, next) => {
    try {
        const decoded = await UserValidation.jwtUserDecoded(req.user);
        const user = await UserService.deleteUser(decoded);
        res.status(200).json({ id: decoded.id });
    } catch(err) {
        err.statusCode = 401
        next(err);
    }
});


module.exports = router;
