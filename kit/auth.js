const _ = require('lodash');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { postJson, postForm } = require('./httpsutil');

const { appId, secret, secBaseUrl } = require('./setting');

const CWD = process.cwd();
const tokenFile = path.join(CWD, 'token.json');

const getTokenInfo = () => {
  if(fs.existsSync(tokenFile)){
    const content = fs.readFileSync(tokenFile);
    try {
      return JSON.parse(content.toString());
    } catch (error) {
      return
    }
  }
  return;
}

const saveTokenInfo = token => {
  const ws = fs.createWriteStream(tokenFile);
  ws.write(JSON.stringify(token));
  ws.end();
}

const CACHE_TOKEN = getTokenInfo();

const getToken = async ( ) => {
  try {
    let token;
    const NOW = _.now();
    if(!_.isEmpty(CACHE_TOKEN)){
      const { expiresTime } = CACHE_TOKEN;
      
      if(NOW >= expiresTime){
        // invalid , refresh the token, save it, return it
        token = await refreshToken(CACHE_TOKEN);
      }else{
        return CACHE_TOKEN;
      }
    }else{
      const url = `${ secBaseUrl }login`;
      token = await postForm({ url, data: { appId, secret }});
    }
    assert( token != undefined, 'Get/Refresh Token Error!');
    const { expiresIn } = token;
    token.expiresTime = NOW + (expiresIn * 1000);
    saveTokenInfo(token);
    return token;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async ( arg ) => {
  try {
    const { refreshToken } = arg;
    assert( refreshToken != undefined, 'Refresh Token Required when invoke the refreshToken()')
    const url = `${ secBaseUrl }refreshToken`;
    const token = await postJson({ url, data: { appId, secret, refreshToken }});
    return token;
  } catch (error) {
    throw error;
  }
};

exports.getToken = getToken;
exports.refreshToken = refreshToken;