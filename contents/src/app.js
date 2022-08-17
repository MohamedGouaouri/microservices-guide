const express = require("express")
const {ApolloServer, gql} = require("apollo-server-express")

const app = express()


let users = [
    {
        id: 1,
        username: "Mohammed",
        email: "mohammed@esi.dz"
    },
    {
        id: 2,
        username: "Younes",
        email: "younes@esi.dz"
    },
    {
        id: 3,
        username: "Ania",
        email: "ania@esi.dz"
    },
    {
        id: 4,
        username: "Bhd_Sd",
        email: "bhd_sd@esi.dz"
    },
]
let lastId = 4;

/*
* The GraphQL schema provided to the Apollo Server
* is all the available data for reading and writing
* data via GraphQL.
* */
const schema = gql`
    # A mandatory type
    type Query{
        me: User,
        user(id: ID): User,
        posts: [Post],
        users: [User]!
    }
    
    type User{
        id: ID!,
        username: String!,
        email: String!
    }
    
    type Post{
        title: String!,
        authors: [User]
    }
    
    type Mutation {
        createUser(username: String!, email: String!): User!,
        deleteUser(id: ID!): Boolean!,
#        updateUser(id: ID!, username: String, email: String): User
    }
`
/*
* Resolvers are used to return data for fields
* from the schema.
* */
const resolvers = {
    Query: {
        me: (parent, args, ctx) => {
            return ctx.me
        },
        // args is an object of key value pairs that correspond to passed parameters
        user: (parent, args) => {
            const {id} = args
             return users.filter(u => u.id == id)

        },
        users: () => {
            return users
        },

        posts: () => {
            return [
                {
                    authors: [
                        {
                            id: 2,
                            username: 'Ania',
                            email: "ania@esi.dz"
                        }
                    ]
                },
            ]
        }

    },


    Mutation: {
        createUser: (parent, {username}, {email}) => {
            const user = {
                id: ++lastId,
                username: username,
                email: email
            }
            users.push(user)
            return user
        },

        deleteUser: (parent, {id}) => {
            const {[id]: user, ...otherUsers} = users
            if (!user) {
                return false;
            }
            users = otherUsers
            return true
        },

        // updateUser: (parent, {id}, {username}, {email}) => {
        //     const {[id]: user, ...otherUsers} = users
        //     if (!user) {
        //         return null;
        //     }
        //     if (username){
        //         user.username = username
        //     }
        //     if (email){
        //         user.email = email
        //     }
        //
        // }

    }

}

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        me: {
            id: 1,
            username: 'Mohammed',
            email: "mohammed@esi.dz"
        },
    },
})

server.start()
    .then(r => {
        server.applyMiddleware({
            app,
            path: "/graphql"
        })
        app.listen({port: 8000}, () => {
            console.log('Apollo Server on port 8000')
        })
    })
    .catch((e) => {
        console.error(`Could not start graphql server`)
    })


