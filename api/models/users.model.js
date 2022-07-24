//  User Model

// imports 
const logger = require('../../config/logs/logger');
const InstagramModel = require('../../config/database/MongoDb.database');


// Models class 
class UserModel {

    async saveUser(data) {
        try {
            // getting data object data
            let IgID = data.id;
            let { name, biography, profile_picture_url, followers_count, follows_count } = data;
            let userName = data.username;
            let postsCount = data.media_count;

            // finding if user exits
            let userExists = await InstagramModel.findOne({ IgID });
            if (userExists) return true;

            // saving User data in MongoDB
            let result = await InstagramModel({
                IgID,
                userName,
                name,
                biography,
                postsCount,
                followers_count,
                follows_count,
                profile_picture_url,
            }).save();

            // returning result
            return result ? true : false;
        } catch (err) {
            logger.error(err);
        }
    }


    async getUser(IgID) {
        // for finding user
        let data = await InstagramModel.findOne({ IgID });

        // Only necessary details to be shown
        const User = Object.assign({}, {
            Name: data.name,
            userName: data.userName,
            Biography: data.biography,
            Followers: data.followers_count,
            Follows: data.follows_count,
            Posts: data.postsCount,
            Profile_Pic: data.profile_picture_url
        });

        //return user or error as false
        return data ? User : false;
    }
}

// exports 
module.exports = new UserModel();