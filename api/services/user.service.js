// User Service

// imports 
const fetch = require('node-fetch');
const createError = require('http-errors');
const logger = require('../../config/logs/logger');
const { saveUserDataUrl } = require('../../urls');
const { saveUser, getUser } = require('../models/users.model');


// service for User controller
class User {

    // saves data 
    async saveUserDataService(id, accessToken, next) {
        try {
            // url for getting user data
            let url = `${saveUserDataUrl}/${id}?` +
                `fields=biography,id,followers_count,follows_count,` +
                `media_count,name,profile_picture_url,username,website&` +
                `access_token=${accessToken}`;

            // fetching user data
            let result = await fetch(url);
            let data = await result.json();

            // saving data in mongDB
            let saveData = await saveUser(data);
            if (!saveData) return next(new createError.InternalServerError());

        } catch (error) {
            logger.error(error);
            return next(new createError.InternalServerError());
        }
    }


    // get the user details from DB
    async getUserDetailsService(id, next) {
        try {
            // get the user data model
            let data = await getUser(id);
            if (!data) return next(new createError.InternalServerError());

            // return user data
            return data;
        } catch (error) {
            return next(error);
        }

    }
}


// exports
module.exports = new User();