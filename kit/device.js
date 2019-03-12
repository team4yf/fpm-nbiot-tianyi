const _ = require('lodash');
const assert = require('assert');
const { postJson } = require('./httpsutil');
const debug = require('debug')('register');

const { cmdDeviceUrl } = require('./setting');

const register = async ( args ) => {
  const { appId, accessToken, verifyCode, endUserId } = args;
  try {
    const url = `${ cmdDeviceUrl }deviceCredentials`;
    const rsp = await postJson({
      url,
      header: {
        app_key: appId,
        Authorization: `Bearer ${ accessToken }`
      },
      data: { verifyCode, nodeId: verifyCode, endUserId }
    });
    const { code } = rsp;
    assert( code == 201, JSON.stringify(rsp));
    return rsp;
  } catch (error) {
    debug('%O', error);
    throw error;
  }
};

exports.register = register;