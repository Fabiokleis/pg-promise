const express = require('express');
const router = express.Router();
const UserService = require('../service/user_service.js');

router.get('/:id', express.urlencoded({ extended: true }), async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserService.getUser(id);
        res.status(200).json(user);
    } catch(err) {
        next(err)
    }
});

router.post('/', express.json(), async (req, res, next) => {
    try {
        const data = req.body;
        const user = await UserService.createUser(data);
        res.status(200).json(user);
    } catch(err) {
        next(err)
    }
});

router.delete('/:id', express.urlencoded({ extended: true}), async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UserService.deleteUser(id);
        res.status(200).json(user);
    } catch(err) {
        next(err)
    }
});


module.exports = router;
