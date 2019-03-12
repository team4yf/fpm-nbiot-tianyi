const assert = require('assert');
const { getToken } = require('../kit/auth');
const { subscriptions, subscribe } = require('../kit/subscribe');
const ID = 'XdbNkfbFSRYPJhs4H2EJ4G12w6Aa',
      SECRET = 'N5fUGGNl9aJIDapXNVkI3SVIfCYa';

describe('Test Unit', function(){

  it('subscriptions', async () => {
    try {
      const { accessToken } = await getToken( { appId: ID, secret: SECRET } );
      const data = await subscriptions({
        appId: ID,
        accessToken,
        
        notifyType: `deviceDataChanged`,
        pageNo: 0,
        pageSize: 0,
        
        
      });
      console.log(data)
    } catch (error) {
      throw error;
    }
    
  });

  it('subscribe', async () => {
    try {
      const { accessToken } = await getToken( { appId: ID, secret: SECRET } );
      const data = await subscribe({
        appId: ID,
        accessToken,
        notifyType: `deviceDataChanged`,
        callbackUrl: `https://a.yunplus.io:9443/webhook/tianyi/notify/deviceChange1`
        
      });
      console.log(data)
    } catch (error) {
      throw error;
    }
    
  });

});