const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const customerRouter = require("./routes/customers.route");

const { consulClientBootstrap } = require("./discovery/discovery");
const { mqDisconnect } = require("./queue/bootstrap_mq")




dotenv.config({
    path: ".env"
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Customers API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(options);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to db")
}).catch(e => {
    console.error(e)
    process.exit(1)
})


const app = express()
app.set("port", 3000)

//// Apply middlewares
// Allow cross-origin
app.use(cors())

// Parse data as json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// consulClientBootstrap()


app.get("/", (req, res) => {
    res.json("API is running")
})

app.use("/api/customers", customerRouter)


process.on("beforeExit", async () => {
    // Close all connections
    await mongoose.connection.close()

    // 
    await mqDisconnect()
})


app.listen(app.get("port"), () => {
    console.log(`App is served under ${app.get("port")} port`);
})