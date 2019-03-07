const _ = require('lodash');
const assert = require('assert');
const { postJson } = require('./httpsutil');

const { appId, cmdBaseUrl } = require('./setting');

const sendCmd = async ( args ) => {
  const { token, deviceId, command } = args;
  try {
    const url = `${ cmdBaseUrl }deviceCommands`;
    const rsp = await postJson({
      url,
      header: {
        app_key: appId,
        Authorization: `Bearer ${ token }`
      },
      data: { deviceId, command }
    });
    return rsp;
  } catch (error) {
    throw error;
  }
};

exports.sendCmd = sendCmd;