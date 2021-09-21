const db = require('../infra/database.js');

const Query = {
    getUserById: (id) => {
        const user = db.query('SELECT * FROM users WHERE id = $1', id);
        return user;
    },

    createUser: ({ name, email, password }) => {
        const user = db
            .query('INSERT INTO users (name, email, password) VALUES ($<name>, $<email>, $<password>) RETURNING id, name, email', {
            name, email, password
        });
        return user;
    },
    
    verifyEmail: (email) => {
        const user = db.query('SELECT id, name, email, password FROM users WHERE email = $<email>', { email });
        return user;
    },

    deleteUserById: (id) => {
        const user = db.query('DELETE FROM users WHERE id = $1', id);
        return user;
    }
}

module.exports = Query;
