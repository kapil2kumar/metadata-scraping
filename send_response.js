
const logger = require('./logger');
module.exports.sendResponse = (req,res, data,statusCode) => {
    logger.info({"method":req.method,"name":req.path,"status":res.statusCode})
    res.status(statusCode).json(data);
};
