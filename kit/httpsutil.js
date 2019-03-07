const _ = require('lodash');
const assert = require('assert');
const fs = require('fs');
const request = require('request');
const path = require('path');

const CWD = process.cwd();

const ContentType_Form = {
  name: 'content-type',
  value: 'application/x-www-form-urlencoded'
};

const ContentType_Json = {
  name: 'content-type',
  value: 'application/json'
};

const _options = {
  url: null,
  method: 'POST',
  agentOptions: {
    cert: fs.readFileSync(path.join(CWD, 'cert/client.crt')),
    key: fs.readFileSync(path.join(CWD, 'cert/client.key')),
  },
  headers: null,
  form : {},
  strictSSL: false
};

const doRequest = ( options ) => {
  console.log(options)
  return new Promise(( rs, rj) => {
    request(options, (error, response, body) => {
      const { statusCode } = response;
      if (!error) {
        rs(_.assign(JSON.parse(body), { code: statusCode }) );
        return;
      }
      rj({ error, code: statusCode })
    });
  });
}

const postCreator = defaultHeader => {
  return args => {
    const { url, data, header } = args;
    assert( !_.isEmpty(url), `URL: ${ url } required ~`);
    const options = _.assign({}, _options, { url, headers: _.concat([ defaultHeader ], header), form: data })
    return doRequest(options);
  }
}
exports.postJson = postCreator( ContentType_Json );
exports.postForm = postCreator( ContentType_Form );