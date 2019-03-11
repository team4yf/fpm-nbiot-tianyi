const _ = require('lodash');
const assert = require('assert');
const debug = require('debug')('biz');

const { sendCmd } = require('../kit/cmd');
const { getToken } = require('../kit/auth');

module.exports = (fpm) => {

  const { appId, secret } = fpm.getConfig('tianyi', {
    appId: 'XdbNkfbFSRYPJhs4H2EJ4G12w6Aa',
    secret: 'N5fUGGNl9aJIDapXNVkI3SVIfCYa',
  })
  // handle the notify webhook
  fpm.subscribe(`#webhook/tianyi/notify`, (topic, message) => {
    // console.log(topic, message);
    debug('%o, %o', topic, message);
    fpm.publish('#tianyi/notify', message);
  })
  
  return {
    registerDevice: async ( args ) => {
      // register a device
      debug('%O', args)
      throw Error('stup')
    },

    send: async ( args ) => {
      // send data to device from server
      debug('%O', args)
      const { deviceId , command } = args;
      try {
        const { accessToken } = await getToken( { appId, secret } );
        const data = await sendCmd({
          appId,
          accessToken,
          deviceId: deviceId || '1d37de7c-8c01-4700-b6d3-0da16ece7a4b',
          command: command || { serviceId: `Light`, method: `SET_LEVEL`, paras: { value: 02 } }
        });
        const { commandId, code } = data;
        assert( code == 201, 'Code should be 201');
        assert( commandId != undefined, 'commandId should not be empty');
        return data;
      } catch (error) {
        throw error;
      }
    },
    subscribe: async ( args ) => {
      // subscribe a event
      debug('%O', args)
      throw Error('stup')
    },
    subscriptions: async ( args ) => {
      // get all of the subscriptions
      debug('%O', args)
      throw Error('stup')
    },

  }

}