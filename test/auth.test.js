const assert = require('assert');
const { getToken, refreshToken } = require('../kit/auth');
const ID = 'XdbNkfbFSRYPJhs4H2EJ4G12w6Aa',
      SECRET = 'N5fUGGNl9aJIDapXNVkI3SVIfCYa';
describe('Test Unit', function(){

  // it('get the accessToken', function(done){
  //   getToken({ appId: ID, secret: SECRET }).then( rsp => {
  //     console.log(rsp);
  //     done()
  //   })
  //   .catch(error => {
  //     console.log(error)
  //     done(error);
  //   })
  // });

  it('refresh token', function(done){
    try {
      const token = require('../token.json');
      refreshToken(token)
        .then( rsp => {
          console.log(rsp);
          done()
        })
        .catch(error => {
          console.log(error)
          done(error);
        })
    } catch (error) {
      done(error)
    }
    
  });

});