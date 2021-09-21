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
        next(err)
    }
});

router.post('/', express.json(), async (req, res, next) => {
    try {
        const data = await UserValidation.createUser(req.body);
        const user = await UserService.createUser(data);
        res.status(200).json(user);
    } catch(err) {
        next(err)
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
            res.status(200).json({ message: "success login!"});
        } else { 
            next('email or password wrong');
        } 

    } catch(err) {
        next(err);
    }
});

router.delete('/', Auth, async (req, res, next) => {
    try {
        const decoded = await UserValidation.jwtUserDecoded(req.body);
        const user = await UserService.deleteUser(decoded);
        res.status(200).json(user);
    } catch(err) {
        next(err)
    }
});


module.exports = router;
