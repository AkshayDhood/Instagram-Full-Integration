// user routes

//import and config
const router = require('express').Router();
const controller = require('../controllers/posts.controller');
const { verifyAccessToken } = require('../middleware/jwt.middleware');


// save user posts auth route will redirect here 
router.get("/saveUserPosts", controller.saveUserPosts);


/**
 * @swagger
 * /posts/getUserPosts:
 *      get:
 *          tags: [For User]
 *          description: Get User Posts.
 *          responses:
 *              200:
 *                  description: You will get the User Posts.
 *              500:
 *                  description: Some error occurred Internally. 
 */
router.get('/getUserPosts', verifyAccessToken, controller.getUserPosts);


// exports router
module.exports = router;