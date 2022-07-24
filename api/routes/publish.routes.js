// user routes

//import and config
const router = require('express').Router();
const controller = require('../controllers/publish.controller');
const upload = require('../middleware/multer.middleware');


/**
 * @swagger
 * /publish/postPhoto:
 *      post:
 *          tags: [For Publish]
 *          parameters:
 *              - name: caption
 *                in: query
 *                schema:
 *                     type: string
 *              - name: path
 *                in: query
 *                schema:
 *                     type: string
 *                description: For online Images with links Only!
 *          requestBody:
 *               description: For Local Images Only!
 *               content:
 *                   multipart/form-data:
 *                       schema:
 *                          type: object
 *                          properties:
 *                              image:
 *                                   type: file
 *          description: Post Photo for Logged In User.
 *          responses:
 *              200:
 *                  description: Photo Posted. 
 *              401:
 *                  description: InValid Access Token.
 *              500:
 *                  description: Internal Server Error Occurred.
 */
// post photo
router.post("/postPhoto", upload.single('image'), controller.postPhoto);


/**
 * @swagger
 * /publish/postVideo:
 *      post:
 *          tags: [For Publish]
 *          parameters:
 *              - name: caption
 *                in: query
 *                schema:
 *                     type: string
 *              - name: path
 *                in: query
 *                schema:
 *                     type: string
 *                description: For online Videos with links Only!
 *          requestBody:
 *               description: For Local Videos Only!
 *               content:
 *                   multipart/form-data:
 *                       schema:
 *                          type: object
 *                          properties:
 *                              video:
 *                                   type: file
 *          description: Post Video(under 1 Min) for Logged In User.
 *          responses:
 *              200:
 *                  description: Video Posted. 
 *              401:
 *                  description: InValid Access Token.
 *              500:
 *                  description: Internal Server Error Occurred.
 */
// post video
router.post("/postVideo", upload.single('video'), controller.postVideo);



/**
 * @swagger
 * /publish/postRemaining:
 *      get:
 *          tags: [For Publish]
 *          description: Remaining Posts Usage for Logged In User.
 *          responses:
 *              200:
 *                  description: Remaining Posts Usage. 
 *              401:
 *                  description: InValid Access Token.
 */
// post video
router.get("/postRemaining", controller.postRemain);


// exports router
module.exports = router;