// multer middleware
const multer = require('multer');
const moment = require('moment');
const timestamp = moment().format('YYYY-MM-DD_hh-mm-ss');

// for storage
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (_req, file, cb) => {
        return cb(null, `(${timestamp})_${file.originalname}`);
    }
});

// upload
const upload = multer({
    storage: storage,
});

// exports
module.exports = upload;