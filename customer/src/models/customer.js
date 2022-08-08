const mongoose = require("mongoose")
const uuid = require('uuid');


const CustomerSchema = new mongoose.Schema({
    customer_id: { type: String, required: true, unique: true, default: "user_" + uuid.v4() },
    firstname: { type: String, required: true, unique: true },
    lastname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

}, {
    collection: "customers"
})


const model = mongoose.model("CustomerModel", CustomerSchema)

module.exports = model 