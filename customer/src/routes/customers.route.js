const router = require("express").Router();
const customerController = require("../controllers/customer.controller");



/**
 * @swagger
 * /users/regiser:
 *  post:
 *    desription: registers a new user to codeground
 *    reponses:
 *      200:
 *        description: User created
 *      401:
 *        description: validation error
 *      500:
 *        description: Couldn't create the user
 */
router.post("/register", customerController.register);

module.exports = router
