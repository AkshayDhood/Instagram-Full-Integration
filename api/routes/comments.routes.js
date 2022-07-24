// comments routes

//import and config
const router = require('express').Router();
const controller = require('../controllers/comments.controller');


/**
 * @swagger
 * /comments/readComments:
 *      get:
 *          tags: [For Comments]
 *          parameters:
 *              - name: mediaID
 *                in: query
 *                schema:
 *                     type: number
 *          description: Read Comments on post by its ID.
 *          responses:
 *              200:
 *                  description: Read Comments.
 *              401:
 *                  description: InValid Access Token. 
 */
// read comments 
router.get("/readComments", controller.readComments);


/**
 * @swagger
 * /comments/addComment:
 *      post:
 *          tags: [For Comments]
 *          parameters:
 *              - name: mediaID
 *                in: query
 *                schema:
 *                     type: number
 *              - name: comment
 *                in: query
 *                schema:
 *                     type: string
 *          description: Comment on post by its ID.
 *          responses:
 *              200:
 *                  description: Comment Posted. 
 *              401:
 *                  description: InValid Access Token.
 */
// post Comment
router.post("/addComment", controller.addComment);


/**
 * @swagger
 * /comments/replyComment:
 *      post:
 *          tags: [For Comments]
 *          parameters:
 *              - name: commentID
 *                in: query
 *                schema:
 *                     type: number
 *              - name: reply
 *                in: query
 *                schema:
 *                     type: string
 *          description: Reply Comments on post by its ID.
 *          responses:
 *              200:
 *                  description: Replied on Comment. 
 *              401:
 *                  description: InValid Access Token.
 */
// reply comments 
router.post("/replyComment", controller.replyComment);


/**
 * @swagger
 * /comments/deleteComment:
 *      delete:
 *          tags: [For Comments]
 *          parameters:
 *              - name: commentID
 *                in: query
 *                schema:
 *                     type: number
 *          description: Deleted Comment on post by its ID.
 *          responses:
 *              200:
 *                  description: Comment Deleted. 
 *              401:
 *                  description: InValid Access Token.
 */
// delete comments 
router.delete("/deleteComment", controller.deleteComment);



// exports router
module.exports = router;