const assert = require('assert');
const fs = require('fs');
const request = require('request');
const HOST = '180.101.147.89', PORT = '8743';
const ID = 'XdbNkfbFSRYPJhs4H2EJ4G12w6Aa', SECRET = 'N5fUGGNl9aJIDapXNVkI3SVIfCYa';

const options = {
  url: `https://${HOST}:${PORT}/iocm/app/sec/v1.1.0/login`,
  method: 'POST',
  agentOptions: {
      cert: fs.readFileSync('./cert/client.crt'),
      key: fs.readFileSync('./cert/client.key')
  },
  headers: [
      {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded'
      }
  ],
  form : 
  {
    'appId': ID,
    'secret': SECRET
  },
  strictSSL: false
};

describe('Test Unit', function(){

  it('get the accessToken', function(done){
    
   
   request(options, (error,response,body) => {
      if (!error && response.statusCode == 200) {
        console.log(body);
        done()
        return;
      }
      done(error)
   });
  });

});