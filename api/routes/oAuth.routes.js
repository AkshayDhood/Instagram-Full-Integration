// FB routes

//import and config
const router = require("express").Router();
const controller = require("../controllers/oAuth.controller");

/**
 * @swagger
 * /auth/getURL:
 *      get:
 *          tags: [Instagram OAuth]
 *          description: Get Instagram Navigation URL.
 *          responses:
 *              200:
 *                  description: You will get the URL.
 *              500:
 *                  description: Some error occurred Internally.
 */
// page for getting authCode
router.get("/getURL", controller.getAuthCode);

// for redirect url
router.get("/instagram-redirect", controller.getAccessToken);

// for getting instagram id
router.get("/getID", controller.getIG_ID);

// exports
module.exports = router;
