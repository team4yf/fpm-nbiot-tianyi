const _ = require('lodash');
const assert = require('assert');
const { getJson, postJson } = require('./httpsutil');
const debug = require('debug')('subscribe');

const { subBaseUrl } = require('./setting');

const subscribe = async ( args ) => {
  // subscribe a callback
  debug('%O', args)
  const { appId, accessToken, callbackUrl, notifyType } = args;
  try {
    assert(!_.isEmpty(callbackUrl), JSON.stringify({ code: -999, message: 'CallbackUrl Required!'}))
    assert(!_.isEmpty(notifyType), JSON.stringify({ code: -999, message: 'notifyType Required!'}))
    const url = `${ subBaseUrl }subscriptions`;
    const rsp = await postJson({
      url,
      header: {
        app_key: appId,
        Authorization: `Bearer ${ accessToken }`
      },
      data: { callbackUrl, notifyType }
    });
    const { code } = rsp;
    assert( code == 201, JSON.stringify(rsp));
    return rsp;
  } catch (error) {
    debug('%O', error);
    throw error;
  }
};

const subscriptions = async ( args ) => {
  // get all of the subscriptions
  debug('%O', args)
  const { appId, accessToken, notifyType = 'deviceDataChanged', pageNo = 0, pageSize = 100 } = args;
  try {
    const rsp = await getJson({
      url: `${subBaseUrl}subscriptions`,
      header: {
        app_key: appId,
        Authorization: `Bearer ${ accessToken }`
      },
      data: {
        notifyType,
        pageNo,
        pageSize,
      }
    })
    const { code } = rsp;
    assert( code == 200, JSON.stringify(rsp));
    return rsp;
  } catch (error) {
    throw error;
  }
};

exports.subscribe = subscribe;
exports.subscriptions = subscriptions;