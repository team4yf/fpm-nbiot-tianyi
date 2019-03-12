const assert = require('assert');
const { register } = require('../kit/device');
const { getToken } = require('../kit/auth');
const ID = 'XdbNkfbFSRYPJhs4H2EJ4G12w6Aa',
      SECRET = 'N5fUGGNl9aJIDapXNVkI3SVIfCYa';
describe('Test Unit', function(){

  it('Device', async () => {
    try {
      const { accessToken } = await getToken( { appId: ID, secret: SECRET } );
      const data = await register({ 
        appId: ID,
        accessToken,
        verifyCode: '333333333', endUserId: '333333333' })
      console.log(data)
    } catch (error) {
      console.error(error)
      throw error;
    }
    
  });

});