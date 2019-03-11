const assert = require('assert');
const { sendCmd } = require('../kit/cmd');
const { getToken } = require('../kit/auth');
const ID = 'XdbNkfbFSRYPJhs4H2EJ4G12w6Aa',
      SECRET = 'N5fUGGNl9aJIDapXNVkI3SVIfCYa';
describe('Test Unit', function(){

  it('set light 20', async () => {

    try {
      const { accessToken } = await getToken( { appId: ID, secret: SECRET } );
      const data = await sendCmd({
        appId: ID,
        accessToken,
        deviceId: 'd9605669-8529-4c5e-ad8a-db65734950fb',
        command: { serviceId: `Light`, method: `SET_LEVEL`, paras: { value: 02 } }
      });
      const { commandId, code } = data;
      assert( code == 201, 'Code should be 201');
      assert( commandId != undefined, 'commandId should not be empty');
    } catch (error) {
      throw error;
    }
  });

});