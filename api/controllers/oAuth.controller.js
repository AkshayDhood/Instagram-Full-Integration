//  Instagram OAuth Controller

//imports
const createError = require('http-errors');
const oAuth = require('../services/oAuth.service');
const { authCode, accessToken, getIG_IDService } = oAuth;


// Controller 
class Controller {

    // for getting auth Code
    getAuthCode(req, res, next) {
        // uri service
        let uri = authCode(next);
         
        // returning url
        req.message = "Navigate to Instagram";
        req.data = uri;
        return next();
    }


    //  For getting Access Token and then redirected to get the instagram id
    async getAccessToken(req, res, next) {
        // getting auth code from redirect url
        const authCode = req.query.code;
        if (!authCode)
            return next(new createError.BadRequest("Authorization Code Error!"));

        // exchange auth code for access token
        let access_token = await accessToken(authCode, next);

        // redirect to get instagram id of user
        res.redirect(`/auth/getID?access_token=${access_token}`);
    }


    //  For getting instagram ID (redirect after getting access token)
    async getIG_ID(req, res, next) {
        // getting access token 
        const accessToken = req.query.access_token;
        if (!accessToken) return next(new createError.BadRequest("Access Token Error!"));

        // get the user instagram id
        let id = await getIG_IDService(accessToken, next);

        // redirecting to save User data
        res.redirect(`/user/saveUserData?id=${id}&accessToken=${accessToken}`);
    }
}


// exports
module.exports = new Controller();