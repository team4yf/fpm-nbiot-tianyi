const _ = require('lodash');
const assert = require('assert');
const debug = require('debug')('httpsutil');
const fs = require('fs');
const request = require('request');
const path = require('path');

const CWD = process.cwd();

const ContentType_Form = {
  'content-type': 'application/x-www-form-urlencoded',
};

const ContentType_Json = {
  'content-type': 'application/json',
};


const _options = {
  url: null,
  method: 'POST',
  agentOptions: {
    cert: fs.readFileSync(path.join(CWD, 'cert/client.crt')),
    key: fs.readFileSync(path.join(CWD, 'cert/client.key')),
  },
  json: true,
  headers: null,
  strictSSL: false
};

const doRequest = ( options ) => {
  debug('%O', options)
  return new Promise(( rs, rj) => {
    request(options, (error, response, body) => {
      if(error){
        rj({ error })
        return;
      }
      const { statusCode } = response;
      try {
        rs(_.assign(body, { code: statusCode }) );
      } catch (error) {
        rs({ body, code: statusCode });
      }
    });
  });
}

const postCreator = (type = 'Form' ) => {
  const defaultHeader = type === 'Form' ? ContentType_Form: ContentType_Json;
  return args => {
    const { url, data, header } = args;
    assert( !_.isEmpty(url), `URL: ${ url } required ~`);
    const options = _.assign({}, _options, { url, headers: _.assign(defaultHeader , header) })
    if( type === 'Form'){
      options.form = data;
    }else{
      options.body = data;
    }
    return doRequest(options);
  }
}

// const getJson = 
exports.postJson = postCreator( 'Json' );
exports.postForm = postCreator( 'Form' );