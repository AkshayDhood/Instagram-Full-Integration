// Main routes

//import and config
const router = require("express").Router();
const instagram_auth_router = require("./oAuth.routes");
const user_router = require("./user.routes");
const posts_router = require("./posts.routes");
const publish_router = require("./publish.routes");
const comments_router = require("./comments.routes");
const { verifyAccessToken } = require("../middleware/jwt.middleware");

// Home Page
router.get("/", (_req, res) => res.send("Home Page!"));

/**
 * @swagger
 * tags:
 *      name: Instagram OAuth
 *      description: Get Instagram Link to User Login
 */
// for FB Auth routes
router.use("/auth", instagram_auth_router);

/**
 * @swagger
 * tags:
 *      name: For User
 *      description: This is for Operations on User
 */
// For operations on User
router.use("/user", user_router);

// For operations on  posts
router.use("/posts", posts_router);

/**
 * @swagger
 * tags:
 *      name: For Publish
 *      description: This is for Publish Posts for logged in User
 */
// For Publishing posts
router.use("/publish", verifyAccessToken, publish_router);

/**
 * @swagger
 * tags:
 *      name: For Comments
 *      description: This is for Operations on Comments for logged in User
 */
// For operations on comments
router.use("/comments", verifyAccessToken, comments_router);

// exports
module.exports = router;
