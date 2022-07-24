// Posts Controller

//imports
const Posts = require('../services/posts.service');
const { saveUserPostsService, getUserPostsService } = Posts;



// Controller Class
class Controller {

    // Save User post in Database (redirect from save user data)
    // output - access token
    async saveUserPosts(req, res, next) {
        // getting access token and id
        let id = req.query.id;
        let accessToken = req.query.accessToken;

        // save user data service
        let ourAccessToken = await saveUserPostsService(id, accessToken, next);

        // returning access token
        req.message = 'Access Token Acquired';
        req.data = { access_token: ourAccessToken };
        return next();

    }


    // get user posts from DB
    async getUserPosts(req, res, next) {
        // getting id and access token
        let id = req.accessToken[0];

        // getting user data
        let data = await getUserPostsService(id, next);

        // returning result
        req.message = `User Posts for ID - ${id}`;
        req.data = data;
        return next();
    }
}


//exports
module.exports = new Controller();