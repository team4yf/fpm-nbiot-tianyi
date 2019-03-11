const fpmc = require("fpmc-jssdk");
const { Func, init } = fpmc;
const assert = require('assert');

init({ appkey:'123123', masterKey:'123123', endpoint: 'http://localhost:9999/api', version: '0.0.1' });

describe('Function', function(){

  it('send', async () => {
    try {
      const rsp = await new Func('tianyi.send').invoke({});
      console.log(rsp);
      assert(rsp === 1, 'should be 1');
    } catch (error) {
      throw error;
    }
    
      
  });

})