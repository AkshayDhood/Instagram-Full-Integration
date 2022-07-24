// user routes

//import and config
const router = require('express').Router();
const controller = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middleware/jwt.middleware');


// save user data auth route will redirect here
router.get("/saveUserData", controller.saveUserData);


/**
 * @swagger
 * /user/getUserDetails:
 *      get:
 *          tags: [For User]
 *          description: Get User Details.
 *          responses:
 *              200:
 *                  description: You will get the User Details.
 *              500:
 *                  description: Some error occurred Internally. 
 */
router.get('/getUserDetails', verifyAccessToken, controller.getUserDetails);



// exports router
module.exports = router;