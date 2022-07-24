// MongoDb Connection and Schema

// Import and Config
const mongoose = require('mongoose');
const logger = require('../logs/logger');
require('dotenv').config();

//env variables
const database = process.env.MONGODB_DATABASE;
const host = process.env.HOST;
const db_port = process.env.MONGODB_PORT;

// MongoDB URL
const url = `mongodb://${host}:${db_port}/${database}`;


// Mongoose to MongoDB connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => logger.info("MongoDB Connected"))
    .catch((err) => logger.error(err));



// Feeds Schema
const Schema = new mongoose.Schema({
    IgID: {
        type: String,
    },
    userName: {
        type: String,
    },
    name: {
        type: String,
    },
    biography: {
        type: String,
    },
    postsCount: {
        type: Number,
    },
    followers_count: {
        type: Number,
    },
    follows_count: {
        type: Number,
    },
    profile_picture_url: {
        type: String,
    },
    posts: {
        type: Array,
    },

});


// Model
const InstagramModel = new mongoose.model("Instagram-Collection", Schema);


// exports
module.exports = InstagramModel;