// User Controller

//imports
const User = require('../services/user.service');
const { saveUserDataService, getUserDetailsService } = User;


// Controller Class
class Controller {

    // Save User Data in Database (redirect after getting IG_ID and access token)
    async saveUserData(req, res, next) {
        // getting access token and id
        let id = req.query.id;
        let accessToken = req.query.accessToken;

        // save user data service
        await saveUserDataService(id, accessToken, next);

        // redirecting to save User posts
        res.redirect(`/posts/saveUserPosts?id=${id}&accessToken=${accessToken}`);
    }


    // get the user details saved in DB
    async getUserDetails(req, res, next) {
        // getting id and access token
        let id = req.accessToken[0];

        // getting user data
        let data = await getUserDetailsService(id, next);

        // returning result
        req.message = `User Data for - ${data.Name}`;
        req.data = data;
        return next();
    }
}


//exports
module.exports = new Controller();