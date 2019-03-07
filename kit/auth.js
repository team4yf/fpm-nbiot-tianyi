const _ = require('lodash');
const assert = require('assert');
const { postJson, postForm } = require('./httpsutil');

const { appId, secret, secBaseUrl } = require('./setting');

const getToken = async ( ) => {
  try {
    const url = `${ secBaseUrl }login`;
    const rsp = await postForm({ url, data: { appId, secret }})
    return rsp;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async ( arg ) => {

};

exports.getToken = getToken;