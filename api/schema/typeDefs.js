const { gql } = require('apollo-server-express')

module.exports = gql`
    type User {
        id: ID!,
        email: String,
        userName: String!,
        userImageURL: String!,
        firstName: String, 
        lastName: String, 
    },

    type Query{
        users: [User]!
        user(id: ID!): User!
        hello: String!
    },

    type Mutation{
        createUser(
                email: String!,
                userName: String!,
                userImageURL: String!,
                firstName: String!,
                lastName: String!
        ):
        User,
    }
`;