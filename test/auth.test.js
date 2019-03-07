const assert = require('assert');
const { getToken } = require('../kit/auth');

describe('Test Unit', function(){

  it('get the accessToken', function(done){
    getToken().then( rsp => {
      console.log(rsp.accessToken);
      done()
    })
    .catch(error => {
      console.log(error)
      done(error);
    })
  });

  it('refresh token', function(done){
    getToken().then( rsp => {
      console.log(rsp.accessToken);
      done()
    })
    .catch(error => {
      console.log(error)
      done(error);
    })
  });

});