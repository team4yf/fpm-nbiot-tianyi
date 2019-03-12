const fpmc = require("fpmc-jssdk");
const { Func, init } = fpmc;
const assert = require('assert');

init({ appkey:'123123', masterKey:'123123', endpoint: 'http://localhost:9999/api', version: '0.0.1' });

describe('Function', function(){

  it('send', async () => {
    try {
      const rsp = await new Func('tianyi.send').invoke({});
      console.log(rsp);
      
    } catch (error) {
      throw error;
    }
    
      
  });

  it('subscriptions', async () => {
    try {
      const rsp = await new Func('tianyi.subscriptions').invoke({notifyType: `deviceDataChanged`,});
      console.log(rsp);
      
    } catch (error) {
      throw error;
    }
    
      
  });

  it('subscribe', async () => {
    try {
      const rsp = await new Func('tianyi.subscribe').invoke({ notifyType: `deviceDataChanged`, callbackUrl: `https://a.yunplus.io:9443/webhook/tianyi/notify/deviceChange2` });
      console.log(rsp);
      
    } catch (error) {
      throw error;
    }
    
      
  });

})