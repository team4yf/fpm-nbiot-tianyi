const assert = require('assert');
const { sendCmd } = require('../kit/cmd');
const { getToken } = require('../kit/auth');
const { appId } = require('../kit/setting');

describe('Test Unit', function(){

  it('set light 20', async () => {

    try {
      const { accessToken } = await getToken();
      const data = await sendCmd({
        token: accessToken,
        deviceId: '7857597',
        command: { serviceId: `Light`, method: `SET_LEVEL`, paras: { value: 30 } }
      });
      const { commandId, code } = data;
      assert( code == 201, 'Code should be 201');
      assert( commandId != undefined, 'commandId should not be empty');
    } catch (error) {
      throw error;
    }
  });

});