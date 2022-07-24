// User Service

// imports 
const fetch = require('node-fetch');
const createError = require('http-errors');
const logger = require('../../config/logs/logger');
const { getMediaUrl } = require('../../urls');
const { signAccessToken } = require('../middleware/jwt.middleware');
const { getPostsIDs, savePostsModel, getAllPosts } = require('../models/posts.model');


class Posts {

    // saves posts 
    async saveUserPostsService(id, accessToken, next) {
        try {
            // url for getting media ids
            let url = `${getMediaUrl}/${id}/media?` +
                `access_token=${accessToken}`;

            // an array for the ids of the posts of user
            let IDsArray = [];

            // if more than 25 posts/ids
            while (url) {
                // getting more ids for posts
                let result = await fetch(url);
                let data = await result.json();
                data.data.forEach(element => {
                    IDsArray.push(element);
                });

                // if more posts/ids
                url = data.paging.next ? data.paging.next : false;
            }

            // ids of posts for which data to be fetched
            let IDs = await getPostsIDs(id, IDsArray);

            IDs.forEach(async element => {
                // url for fetching post data
                let uri = `${getMediaUrl}${element}?` +
                    `fields=id,caption,media_type,like_count,comments_count,media_url,timestamp&` +
                    `access_token=${accessToken}`;

                // fetching posts
                let result = await fetch(uri);
                let data = await result.json();

                // saving post data in mongodb 
                if (!await savePostsModel(id, data)) return next(new createError.InternalServerError());
            });

            // creating our access token
            let ourAccessToken = await signAccessToken([id, accessToken]);

            // returning our access token
            return ourAccessToken;
        } catch (error) {
            logger.error(error);
            return next(new createError.InternalServerError());
        }
    }


    // get user posts
    async getUserPostsService(id, next) {

        // getting all posts
        let data = await getAllPosts(id);
        if (!data) return next(new createError.NotFound("No Posts To Display!"));

        // returning posts
        return data;
    }


    // saves posts that are uploaded by our app 
    // given to publish service
    // save post in DB(mongoDb)
    async savePost(id, postID, accessToken) {

        // url for fetching post data
        let uri = `${getMediaUrl}${postID}?` +
            `fields=id,caption,media_type,like_count,comments_count,media_url,timestamp&` +
            `access_token=${accessToken}`;

        // fetching posts
        let result = await fetch(uri);
        let data = await result.json();

        // returns error if error occurred in fetching data of post
        if (data.error) return false;

        // returns false if error in DB
        return !await savePostsModel(id, data) ? false : true;
    }
}


// exports
module.exports = new Posts();