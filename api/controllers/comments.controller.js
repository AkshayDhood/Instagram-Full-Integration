// Comments Controller

//imports
const createError = require('http-errors');
const Comments = require('../services/comments.service');
const {
    addCommentService,
    readCommentsService,
    deleteCommentService,
    replyCommentService
} = Comments;



// Controller Class
class Controller {

    // Add Comment
    async addComment(req, res, next) {
        // in query variables
        let mediaID = req.query.mediaID;
        let comment = req.query.comment;
        if (!mediaID || !comment) return next(new createError.BadRequest("Enter Comment/Media ID!"));

        // getting variables from access Token
        let accessToken = req.accessToken[1];

        // calling add comment service
        let data = await addCommentService(accessToken, mediaID, comment, next);

        // returning result
        req.message = `Commented on Post with ID - ${mediaID} for User with comment ID - ${data}`;
        return next();
    }


    // Read Comments
    async readComments(req, res, next) {
        // in query variables
        let mediaID = req.query.mediaID;
        if (!mediaID) return next(new createError.BadRequest("Enter Media ID!"));

        // getting variables from access Token
        let accessToken = req.accessToken[1];

        // calling read comment service
        let data = await readCommentsService(accessToken, mediaID, next);

        // returning result
        req.message = `Comments on Post with ID - ${mediaID} for User.`;
        req.data = data;
        return next();
    }


    // reply on a comment
    async replyComment(req, res, next) {
        // in query variables
        let reply = req.query.reply;
        let id = req.query.commentID;
        if (!reply || !id) return next(new createError.BadRequest("Enter Reply/Comment ID!"));

        // getting variables from access Token
        let accessToken = req.accessToken[1];

        // calling reply comment service
        let data = await replyCommentService(accessToken, id, reply, next);

        // returning result
        req.message = `Comments on Post with ID - ${data} for User has a reply with id - ${data}`;
        return next();
    }


    // Delete Comment
    async deleteComment(req, res, next) {
        // in query variables
        let id = req.query.commentID;
        if (!id) return next(new createError.BadRequest("Enter Comment ID!"));

        // getting variables from access Token
        let accessToken = req.accessToken[1];

        // calling delete comment service
        let data = await deleteCommentService(accessToken, id, next);

        // returning result
        req.message = `Comment Deleted on Post with ID - ${id} for User.`;
        req.data = data;
        return next();
    }
}


//exports
module.exports = new Controller();