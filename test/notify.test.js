const assert = require('assert');
const { postJson } = require('../kit/httpsutil');

describe('Test Unit', function(){

  it('notify', async () => {
    try {
      const data = await postJson( {
        url: `http://localhost:9999/notify`,
        data: {
          a: 1
        }
      })
      console.log(data)
    } catch (error) {
      throw error;
    }
    
  });

});