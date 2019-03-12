const _ = require('lodash');
const assert = require('assert');
const debug = require('debug')('IP');
const request = require('request');

const IP138 = 'http://2019.ip138.com/ic.asp';

exports.getWanIp = async () => {
  return new Promise(( rs, rj ) => {
    request({ url: IP138 }, (error, response, body) => {
      if(error){
        rj(error)
        return;
      }
      const { statusCode } = response;
      if( statusCode == 200){
        const ret = body.match(/(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])/g)
        if(_.size(ret) === 1){
          rs(ret[0])
          return;
        }        
      }

      rj(body);

    })

  });
}
