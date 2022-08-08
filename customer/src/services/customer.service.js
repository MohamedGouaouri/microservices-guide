const axios = require("axios")
// const amqp = require("amqplib")


const register = async (firstName, lastName, email) => {
    // Check if customer is fraudster
    const response = await axios({
        method: "get",
        url: "https://b5f7-154-246-243-239.ngrok.io/fraud-check",
        data: {
            email: email
        }
    })
    if (response.data.fraudster) {
        return false
    }

    try {
        await User.create({
            firstname: firstName,
            lastname: lastName,
            email: email,
        })
        return true
    } catch (e) {
        console.error(e)
        return false
    }

}



module.exports = {
    register
}