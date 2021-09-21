const Query = require('../data/dataAccess.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserService = {
    getUser: ({ id }) => {
        const user = Query.getUserById(id);
        return user;
    },

    createUser: (data) => {
        data.password = bcrypt.hashSync(data.password, parseInt(process.env.SALT));
        const user = Query.createUser(data);
        return user;
    },

    updateUserName: (id, { name }) => {
        const user = Query.updateUserName(name, id);
        return user;
    },

    verifyIfNameExist: ({ name }) => {
        const user = Query.verifyIfNameExist(name);
        return user;
    },

    verifyEmail: (data) => {
        const user = Query.verifyEmail(data.email);
        return user;
    },

    loginUser: (data, user) => {
        const hashValidation = bcrypt.compareSync(data.password, user[0].password);
        if (hashValidation) {
            const { id, email, name } = user[0];
            const token = jwt.sign({ id, email, name }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            return token;
        }

        throw new Error('email or password wrong');
    },

    deleteUser: ({ id }) => {
        const user = Query.deleteUserById(id);
        return user;
    }
}

module.exports = UserService;
