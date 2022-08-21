const {gql} = require("apollo-server-express");


/*
* The GraphQL schema provided to the Apollo Server
* is all the available data for reading and writing
* data via GraphQL.
* */

const schema = gql`
    type Query{
        me: User, # The currently logged ing user
        user(id: ID): User, # get user by id
        users: [User]!, # Get all users
        posts: [Post], # Get all posts,
        post(id: ID): Post
    }

    type User{
        id: ID!,
        username: String!,
        email: String!,
        posts: [Post]
    }

    type Post{
        title: String!,
        text: String!,
        author: User!
    }

    type Mutation {
        createUser(username: String!, email: String!): User!,
        deleteUser(id: ID!): Boolean!,
        
        createPost(title: String!, text: String!, author: ID!): Post!,
        deletePost(id: ID!): Boolean!,
    }
`
module.exports = schema