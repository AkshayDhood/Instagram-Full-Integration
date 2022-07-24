//  User Model

// imports 
const logger = require('../../config/logs/logger');
const InstagramModel = require('../../config/database/MongoDb.database');


// Models class 
class PostsModel {

    // saving posts
    async savePostsModel(IgID, data) {
        try {
            // saving User data in MongoDB
            let result = await InstagramModel.findOneAndUpdate({ IgID }, {
                $push: {
                    posts: data
                }
            });

            // return error/false if some problem
            return result ? true : false;
        } catch (err) {
            logger.error(err);
        }
    }


    // getting post ids which are not saved in DB
    async getPostsIDs(IgID, data) {
        let IDsArray = [];
        let count = true;

        // finding if user exits
        let userData = await InstagramModel.findOne({ IgID });

        // Adding IDs to an array
        await data.forEach(element => {
            userData.posts.forEach(DBElement => {
                if (element.id == DBElement.id) count = false;
            });
            if (count) IDsArray.push(element.id);
            else count = true;
        });

        // returning IDs Array
        return IDsArray;
    }


    // get all posts in DB to display
    async getAllPosts(IgID) {

        // finding if user exits
        let userData = await InstagramModel.findOne({ IgID });
        if (userData.posts.length == 0) return false;

        // returning posts
        return userData.posts;
    }
}


// exports
module.exports = new PostsModel();