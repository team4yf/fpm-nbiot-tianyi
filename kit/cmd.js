const _ = require('lodash');
const assert = require('assert');
const { postJson } = require('./httpsutil');

const { appId, secret, cmdBaseUrl } = require('./setting');

const sendCmd = async ( args ) => {
  const { appId, token, deviceId, command } = args;
  try {
    const url = `${ cmdBaseUrl }deviceCommands`;
    const rsp = await postJson({
      url,
      header: [
        { name: 'app_key', value: appId },
        { name: 'Authorization', value: `Bearer ${ token }` },
      ],
      data: { deviceId, command, callbackUrl: '' }
    });
    return rsp;
  } catch (error) {
    throw error;
  }
};

exports.sendCmd = sendCmd;