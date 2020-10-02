const express = require("express");
const validate = require('express-jsonschema').validate;
const URL = require("url").URL;
const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const fetch = require("node-fetch");
const NodeCache = require( "node-cache" );
const validUrl = require('valid-url');

const myCache = new NodeCache( { stdTTL: 60*60, checkperiod: 30*60,maxKeys:200 } );

const inputValidation = require('./variables/input_validation');
const send_response = require('../send_response');
const logger = require('../logger');

let router = express.Router();

const stringIsAValidUrl = (s) => {
  if (validUrl.isUri(s)){
    return true;
  } 
  else {
    return false;
  }
};



/**
 * JSON parameters require a model. URL model
 * @typedef URL
 * @property {string} url.required - url --eg: https://ogp.me/
 */
/**
 * This API is use to get metadata from webpage
 * @route POST /getMetaInfo
 * @group Get metadata from webpage
 * @param {URL.model} name.body.required - URL
 * @returns {object} 200 - An object {status, msg, data, error}
 * @returns {Error}  500,400,etc - {status, msg, data, error}
 * @security JWT
 */
router.post("/getMetaInfo",validate({body: inputValidation.validateURL}), async (req, res) => {
  let url = req.body.url;
  let validURL = stringIsAValidUrl(url); //true
  if (validURL) {
    logger.info("Valid URL");
    value = myCache.get(url);
    if ( value == undefined ){
      logger.info("data not exist in myCache");
      // handle miss!
      try {
        const response = await fetch(url);
        const html = await response.text();
        const doc = domino.createWindow(html).document;
        const metadata = getMetadata(doc, url);
        logger.info("set data in myCache");
        myCache.set( url, metadata);
        return send_response.sendResponse(req,res, {
          status: true,
          msg: 'Success',
          data: metadata,
          error: ""
        }, 200);  
      } catch (error) {
        return send_response.sendResponse(req,res, {
          status: false,
          msg: 'Something broke!',
          data: "",
          error:error.message
        }, 500);  
      }
      
    } else {
      logger.info("data exist in myCache");
      return send_response.sendResponse(req,res, {
        status: true,
        msg: 'Success',
        data: value,
        error: ""
      }, 200);
    }
  } else {
    return send_response.sendResponse(req,res, {
      status: false,
      msg: 'Invalid URL',
      data: "",
      error: ""
    }, 400);
  }
});


module.exports = router;