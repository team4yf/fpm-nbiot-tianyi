const _ = require('lodash');
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const debug = require('debug')('auth');
const { postJson, postForm } = require('./httpsutil');

const { secBaseUrl } = require('./setting');

const LOGIN_URL = `${ secBaseUrl }login`;
const REFRESH_URL = `${ secBaseUrl }refreshToken`;

const CWD = process.cwd();
const tokenFile = path.join(CWD, 'token.json');

const getTokenInfo = () => {
  if(fs.existsSync(tokenFile)){
    const content = fs.readFileSync(tokenFile);
    try {
      return JSON.parse(content.toString());
    } catch (error) {
      debug('getTokenInfo() error! %o', error);
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

let CACHE_TOKEN = getTokenInfo();

const checkToken = ( token ) => {
  try {
    const { code } = token;
    assert(code == 200, `${JSON.stringify(token)}`);    
    return true;
  } catch (error) {
    debug('Token is error! %o', error);
    return false;
  }
}

const getToken = async ({ appId, secret }) => {
  try {
    let token;
    const NOW = _.now();
    if(!_.isEmpty(CACHE_TOKEN)){
      const { expiresTime } = CACHE_TOKEN;
      if(!checkToken(token)){
        // 已存在的token 是错误的，无法使用，需要重新登录
        token = await postForm({ url: LOGIN_URL, data: { appId, secret }});
      }else{
        // token 正确
        if(NOW >= expiresTime){
          // invalid , refresh the token, save it, return it
          token = await refreshToken(CACHE_TOKEN);
          if(!checkToken(token)){
            // 已存在的 refreshCode 完全实效了，无法使用，需要重新登录
            token = await postForm({ url: LOGIN_URL, data: { appId, secret }});
          }
        }else{
          return CACHE_TOKEN;
        }
      }
    }else{
      token = await postForm({ url: LOGIN_URL, data: { appId, secret }});
    }
    assert( token != undefined, JSON.stringify({ code: -999, message: 'Get/Refresh Token Error!' }) );
    assert(checkToken(token) === true, JSON.stringify(token))
    const { expiresIn } = token;
    token.expiresTime = NOW + (expiresIn * 1000);
    token.appId = appId;
    token.secret = secret;
    // stash the token cached
    CACHE_TOKEN = token;
    saveTokenInfo(token);
    return token;
  } catch (error) {
    debug('getToken() %o', error)
    throw error;
  }
};

const refreshToken = async ( arg ) => {
  try {
    const { refreshToken, appId, secret } = arg;
    assert( refreshToken != undefined, JSON.stringify({ code: -999, message: 'Refresh Token Required when invoke the refreshToken()' }))
    const token = await postJson({ url: REFRESH_URL, data: { appId, secret, refreshToken }});
    return token;
  } catch (error) {
    debug('refreshToken() %o', error)
    throw error;
  }
};

exports.getToken = getToken;
exports.refreshToken = refreshToken;