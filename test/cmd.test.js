const assert = require('assert');
const { sendCmd } = require('../kit/cmd');
const { getToken } = require('../kit/auth');
const { appId } = require('../kit/setting');

describe('Test Unit', function(){

  it('set light 20', async () => {

    try {
      const { accessToken } = await getToken();
      const data = await sendCmd({
        appId,
        token: accessToken,
        deviceId: '1d37de7c-8c01-4700-b6d3-0da16ece7a4b',
        command: { serviceId: `Light`, method: `SET_LEVEL`, paras: { value: 20 } }
      });
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  });

});