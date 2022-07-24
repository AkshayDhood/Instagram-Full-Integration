// JWT Tokens Generator

// Modules imported
const jwt = require('jsonwebtoken');
const creatError = require('http-errors');
require('dotenv').config();


// Exporting Functions
let jwtTokens = {

    // For giving access token
    signAccessToken: (data) => {
        return new Promise((resolve, reject) => {

            // access token options
            const payload = {};
            const secret = process.env.TOKEN_SECRET;
            const options = {
                expiresIn: "1d",
                issuer: `localhost:1000`,
                audience: data,
            };

            // creating JWT access token
            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(creatError.InternalServerError());
                }
                resolve(token);
            });
        });
    },


    // Verifying access token
    verifyAccessToken: (req, res, next) => {

        // if no access token in header
        if (!req.headers.authorization) return next(creatError.Unauthorized("Enter Access Token!"));
        const authHeader = req.headers.authorization;
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];

        // verifying access token
        jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message = (err.name === 'JsonWebTokenError') ? 'Unauthorized' : err.message;
                return next(creatError.Unauthorized(message));
            }
            req.accessToken = payload.aud;
            next();
        });
    },
};


// exports
module.exports = jwtTokens;