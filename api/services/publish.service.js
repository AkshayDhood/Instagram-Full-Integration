// Publish Services

// import and config
const createError = require('http-errors');
const fetch = require('node-fetch');
const logger = require('../../config/logs/logger');
const url = require('../../urls');
const { savePost } = require('../services/posts.service');

// URLs
let publishUrl = url.publishUrl;
let containerUrl = url.containerUrl;
let getIGUrl = url.getIGUrl;


class Publish {

    // Service for publishing Image
    async postPhotoService(accessToken, id, path, caption, next) {
        try {
            // url for posting photo
            let post_url = `${publishUrl}/${id}/media?&` +
                `image_url=${path}&` +
                `caption=${caption}&` +
                `access_token=${accessToken}`;

            // Creating container for posting photo
            let post_result = await fetch(post_url, { method: 'POST' });
            let post_data = await post_result.json();

            // if any error occurred in crating container
            if (post_data.error) return next(new createError.MethodNotAllowed());

            // container ID
            let containerID = post_data.id;

            // url for checking container status
            let container_url = `${containerUrl}/${containerID}?` +
                `fields=status_code&` +
                `access_token=${accessToken}`;

            // url for publishing container
            let publish_url = `${publishUrl}/${id}/media_publish?` +
                `creation_id=${containerID}&` +
                `access_token=${accessToken}`;


            // promise to publish post if container finished
            return new Promise(async(resolve, reject) => {
                let status_code;
                await setInterval(async() => {

                    // fetching container status
                    let container_result = await fetch(container_url);
                    let container_data = await container_result.json();
                    status_code = container_data.status_code;

                    // if error in container
                    if (status_code === 'ERROR') reject(next(new createError.RequestTimeout("File Upload Fail!")));

                    // if upload/container is finished 
                    if (status_code === "FINISHED") {

                        // Creating container for posting photo
                        let publish_result = await fetch(publish_url, { method: 'POST' });
                        let publish_data = await publish_result.json();

                        // if error then return error
                        if (container_data.error) reject(next(new createError.MethodNotAllowed()));

                        // saves post details in DB
                        if (!await savePost(id, publish_data.id, accessToken))
                            reject(next(new createError.InternalServerError()));

                        // resolve and return its id
                        resolve(publish_data.id);
                    }
                }, 2000);
            });
        } catch (error) {
            logger.error(error);
            return next(new createError.InternalServerError());
        }
    }



    // Service for publishing video
    async postVideoService(accessToken, id, path, caption, next) {
        try {
            // url for posting video
            let post_url = `${publishUrl}/${id}/media?media_type=VIDEO&` +
                `video_url=${path}&` +
                `caption=${caption}&` +
                `access_token=${accessToken}`;

            // Creating container for posting video
            let post_result = await fetch(post_url, { method: 'POST' });
            let post_data = await post_result.json();

            // if any error occurred in crating container
            if (post_data.error) return next(new createError.MethodNotAllowed());

            // container ID
            let containerID = post_data.id;

            // url for checking container status
            let container_url = `${containerUrl}/${containerID}?` +
                `fields=status_code&` +
                `access_token=${accessToken}`;

            // url for publishing container
            let publish_url = `${publishUrl}/${id}/media_publish?` +
                `creation_id=${containerID}&` +
                `access_token=${accessToken}`;


            // promise to publish post if container finished
            return new Promise(async(resolve, reject) => {
                let status_code;
                await setInterval(async() => {

                    // fetching container status
                    let container_result = await fetch(container_url);
                    let container_data = await container_result.json();
                    status_code = container_data.status_code;

                    // if error in container
                    if (status_code === 'ERROR') reject(next(new createError.RequestTimeout("File Upload Fail!")));

                    // if upload/container is finished 
                    if (status_code === "FINISHED") {

                        // Creating container for posting photo
                        let publish_result = await fetch(publish_url, { method: 'POST' });
                        let publish_data = await publish_result.json();

                        // if error then return error
                        if (container_data.error) reject(next(new createError.MethodNotAllowed()));

                        // saves post details in DB
                        if (!await savePost(id, publish_data.id, accessToken))
                            reject(next(new createError.InternalServerError()));

                        // resolve and return its id
                        resolve(publish_data.id);
                    }
                }, 5000);
            });
        } catch (error) {
            logger.error(error);
            return next(new createError.InternalServerError());
        }
    }


    // For remaining posts
    async postRemainService(accessToken, id, next) {
        try {
            // remaining post url
            let url = `${getIGUrl}/${id}/content_publishing_limit?` +
                `fields=quota_usage&` +
                `access_token=${accessToken}`;

            // fetching remaining posts
            let result = await fetch(url);
            let data = await result.json();

            //returning data
            return data.data[0];
        } catch (error) {
            return next(new createError.InternalServerError());
        }
    }
}


// exports
module.exports = new Publish();