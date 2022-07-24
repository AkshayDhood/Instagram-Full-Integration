// Output Response
const output = (req, res) => {
    return res.send({
        code: req.code || 200,
        status: req.status || "success",
        message: req.message,
        data: req.data
    });
};


// exports
module.exports = output;