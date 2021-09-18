const Query = require('../data/data_access.js');

const UserService = {
    getUser: ({ id }) => {
        const user = Query.getUserById(id);
        return user;
    },

    createUser: (data) => {
        const user = Query.createUser(data);
        return user;
    },

    deleteUser: ({ id }) => {
        const user = Query.deleteUserById(id);
        return user;
    }
}

module.exports = UserService;
