// FbAuth Services

// import and config
const fetch = require('node-fetch');
const createError = require('http-errors');
const logger = require('../../config/logs/logger');
const url = require('../../urls');
require('dotenv').config();


// env variables and urls
let appID = process.env.APPID;
let appSecret = process.env.APP_SECRET;
let authCodeURL = url.authCodeUrl;
let redirectURL = url.redirectUrl;
let accessTokenURL = url.accessTokenUrl;
let getFBPageUrl = url.getFBPageUrl;
let getIGUrl = url.getIGUrl;


// Service for OAuth Controller
class OAuth {

    // Return authCode URL
    authCode(next) {
        try {
            // authCode URI
            const uri = `${authCodeURL}client_id=${appID}&` +
                `redirect_uri=${redirectURL}&` +
                `scope=instagram_basic,instagram_content_publish,pages_read_engagement,` +
                `instagram_manage_comments,pages_show_list&` +
                `response_type=code`;

            // response page URL for login
            return uri;
        } catch (err) {
            logger.error(err);
            return next(new createError.InternalServerError());
        }
    }


    // for obtaining accessToken
    async accessToken(authCode, next) {
        try {
            // creating url for getting access token
            const uri = `${accessTokenURL}` +
                `client_id=${appID}&` +
                `client_secret=${appSecret}&` +
                `redirect_uri=${redirectURL}&` +
                `code=${authCode}`;

            // Make an API request to exchange `authCode` for an access token
            let result = await fetch(uri);
            let data = await result.json();
            let accessToken = data.access_token;

            // returns instagram access token
            return accessToken;
        } catch (err) {
            logger.error(err);
            return next(new createError.InternalServerError());
        }
    }


    // get instagram id 
    async getIG_IDService(accessToken, next) {
        try {
            // URL for getting Facebook user pages
            let FBPageUri = `${getFBPageUrl}${accessToken}`;

            // fetching data on facebook user
            let FB_result = await fetch(FBPageUri);
            let FB_data = await FB_result.json();
            let page_id = FB_data.data[0].id;

            // url for getting users instagram id
            let IGUri = `${getIGUrl}${page_id}?` +
                `fields=instagram_business_account&` +
                `access_token=${accessToken}`;

            // fetching instagram id
            let IG_result = await fetch(IGUri);
            let IG_data = await IG_result.json();

            //  instagram ID
            let id = IG_data.instagram_business_account.id;

            // return our access token
            return id;
        } catch (error) {
            return next(new createError.InternalServerError());
        }
    }
}



// Exporting authCode
module.exports = new OAuth();