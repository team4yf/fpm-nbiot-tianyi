const assert = require('assert');
const { getToken, refreshToken } = require('../kit/auth');

describe('Test Unit', function(){

  /*
  { accessToken: '8c86553b314a82d76d68432fa610b9b1',
  tokenType: 'bearer',
  refreshToken: '5d1f88cab9969a8e4b1af4dcceefef61',
  expiresIn: 3600,
  scope: 'default',
  code: 200 }
  */
  it('get the accessToken', function(done){
    getToken().then( rsp => {
      console.log(rsp);
      done()
    })
    .catch(error => {
      console.log(error)
      done(error);
    })
  });

  // it('refresh token', function(done){
  //   try {
  //     const token = require('../token.json');
  //     refreshToken(token)
  //       .then( rsp => {
  //         console.log(rsp);
  //         done()
  //       })
  //       .catch(error => {
  //         console.log(error)
  //         done(error);
  //       })
  //   } catch (error) {
  //     done(error)
  //   }
    
  // });

});