// Comments Service

// imports 
const fetch = require('node-fetch');
const createError = require('http-errors');
const logger = require('../../config/logs/logger');
const { publishUrl } = require('../../urls');



class Comments {

    // Add comment service
    async addCommentService(accessToken, id, comment, next) {
        try {
            // url for reading comments
            let url = `${publishUrl}/${id}/comments?` +
                `message=${comment}&` +
                `access_token=${accessToken}`;

            // fetching comments data
            let result = await fetch(url, { method: 'POST' });
            let data = await result.json();
            if (data.error) return next(new createError.NotFound("Check ID!"));

            // returning data
            return data.id;
        } catch (error) {
            logger.error(error);
            return next(new createError.InternalServerError());
        }
    }


    // for reading comments 
    async readCommentsService(accessToken, id, next) {
        try {
            // url 
            let url = `${publishUrl}/${id}/comments?` +
                `access_token=${accessToken}`;

            //fetching data
            let result = await fetch(url);
            let data = await result.json();
            if (data.error) return next(new createError.NotFound("Check ID!"));

            // returning data 
            return data.data;
        } catch (error) {
            logger.error(error);
            return next(new createError.InternalServerError());
        }
    }


    // for reply on comments 
    async replyCommentService(accessToken, id, reply, next) {
        try {
            // url 
            let url = `${publishUrl}/${id}/replies?` +
                `message=${reply}&` +
                `access_token=${accessToken}`;

            // fetching data
            let result = await fetch(url, { method: 'POST' });
            let data = await result.json();
            if (data.error) return next(new createError.NotFound("Check ID!"));

            // returning data  
            return data.id;
        } catch (error) {
            logger.error(error);
            return next(new createError.InternalServerError());
        }
    }



    // for deleting comments 
    async deleteCommentService(accessToken, id, next) {
        try {
            // url 
            let url = `${publishUrl}/${id}?` +
                `access_token=${accessToken}`;

            // fetching data
            let result = await fetch(url, { method: 'DELETE' });
            let data = await result.json();
            if (data.error) return next(new createError.NotFound("Check ID!"));

            // returning data 
            return data;
        } catch (error) {
            logger.error(error);
            return next(new createError.InternalServerError());
        }
    }

}


// exports
module.exports = new Comments();