const db = require('../database/config/dbConfig');

module.exports =  {
    Query: {
    users(parent, args, ctx) {
        return db("users");
        },
    user(_, { id }) {
        return db("users").where({ id }).first();
        },
    },
    Mutation: {
        createUser: (parent, args, { models }) => {
            models.User.create(args)
        }
    }
};