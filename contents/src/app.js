const express = require("express")
const {ApolloServer, gql} = require("apollo-server-express")
const schema = require("./graphql/schema/schema");
const mongoose = require("mongoose");
const resolvers = require("./graphql/resolvers/index")
const models = require("./models/index")

const app = express()

// Connect to db
mongoose.connect('mongodb+srv://mohammed:mohammed@cluster0.rehfcgz.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to db")
}).catch(e => {
    console.error(e)
    process.exit(1)
})

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        me: {
            id: 1,
            username: 'Mohammed',
            email: "mohammed@esi.dz"
        },
        models
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


