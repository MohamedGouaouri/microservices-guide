const Joi = require("joi")
const customerService = require("../services/customer.service")

const register = async (req, res) => {
    const data = req.body;
    const validator = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required()
    });

    const { error } = validator.validate(data);
    if (error) {
        // Bad request
        return res.status(400).json({
            errors: [{ message: error.details[0].message }]
        });
    }
    const { firstName, lastName, email } = data
    const result = await customerService.register(firstName, lastName, email);

    console.log(result)
    if (result) {
        return res.json("Customer added")
    }
    return res.json("customer could not be added")
}

const getAll = async (req, res) => {
    const result = await customerService.getAll()

    return res.json(result)
}


module.exports = {
    register,
    getAll
}