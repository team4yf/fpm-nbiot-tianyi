const assert = require('assert');
const { getWanIp } = require('../kit/ip');

describe('Test Unit', function(){

  it('getWanIp', async () => {
    try {
      const data = await getWanIp()
      console.log(data)
    } catch (error) {
      console.error(error)
      throw error;
    }
    
  });

});