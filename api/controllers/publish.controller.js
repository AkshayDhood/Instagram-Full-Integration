// Publish Controller

//imports
const ngrok = require('ngrok');
const createError = require('http-errors');
const validation = require('../helpers/validation.helper');
const Publish = require('../services/publish.service');
const { postPhotoService, postVideoService, postRemainService } = Publish;


// Controller 
class Controller {

    // post photo
    async postPhoto(req, res, next) {
        // getting all variables
        let path;
        let id = req.accessToken[0];
        let accessToken = req.accessToken[1];
        let caption = req.query.caption;

        // getting path for image to upload
        if (req.query.path && req.file)
            return next(new createError.Conflict("Can't Choose Both Online URL Path and local Image."));
        else if (req.query.path) {
            path = req.query.path;
        } else if (req.file) {
            let filename = req.file.filename;
            let url = await ngrok.connect(1000);
            path = `${url}/${filename}`;
        }

        // checking if path is empty or not
        if (!path) return next(new createError.BadRequest("Path Not Found!"));

        // validating path and caption
        caption = validation(path, caption);
        if (!caption) return next(new createError.BadRequest("Path or Caption Format Error!"));

        // calling post photo service
        let data = await postPhotoService(accessToken, id, path, caption, next);

        // returning result
        req.message = `Photo Posted for User with ID - ${data}`;
        return next();
    }



    // post video
    async postVideo(req, res, next) {
        // getting all variables
        let path;
        let id = req.accessToken[0];
        let accessToken = req.accessToken[1];
        let caption = req.query.caption;

        // getting path for video to upload
        if (req.query.path && req.file)
            return next(new createError.Conflict("Can't Choose Both Online URL Path and local Video."));
        else if (req.query.path) {
            path = req.query.path;
        } else if (req.file) {
            let filename = req.file.filename;
            let url = await ngrok.connect(1000);
            path = `${url}/${filename}`;
        }

        // checking variables are correct or not
        if (!path) return next(new createError.BadRequest("Path Not Found!"));

        // validating path and caption
        caption = validation(path, caption);
        if (!caption) return next(new createError.BadRequest("Path or Caption Format Error!"));

        // calling post video service
        let data = await postVideoService(accessToken, id, path, caption, next);

        // returning result
        req.message = `Video Posted for User with ID - ${data}`;
        return next();
    }


    // get the post used today 
    async postRemain(req, res, next) {
        // getting all variables
        let accessToken = req.accessToken[1];
        let id = req.accessToken[0];

        // calling post remain service
        let data = await postRemainService(accessToken, id, next);

        // returning result
        req.message = `Quota Usage for Posts for User`;
        req.data = data;
        return next();
    }
}


//exports
module.exports = new Controller();