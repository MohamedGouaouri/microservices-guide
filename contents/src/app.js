const express = require("express")
const {ApolloServer, gql} = require("apollo-server-express")

const app = express()

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
             return id == 1 ? {
                 id: 1,
                 username: 'Mohammed',
                 email: "mohammed@esi.dz"
             }: null

        },
        users: () => {
            return [{
                id: 1,
                username: 'Mohammed',
                email: "mohammed@esi.dz"
            },
                {
                    id: 2,
                    username: 'Ania',
                    email: "Ania@esi.dz"
                }
            ]
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

    User: {
        username: (parent) => 'Hans',
    },

    Post: {
        title: () => {
            return 'testing'
        },
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


