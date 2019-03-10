const { Fpm } = require('yf-fpm-server');

const fpm = new Fpm({ disableBodyParser: '/notify'});

const router = fpm.createRouter();

router.post('/notify', async (ctx) =>{

  try {
    const data = parseJson(ctx);
    console.log(data);
    ctx.body = { code: 0 }
  } catch (error) {
    ctx.throw(error, 502);
  }
  
});

const parseJson = (ctx) => {
  return new Promise( (rs, rj) => {
    const { req } = ctx;

    let data = '';

    req.on('data',  (chunk) => {
      data += chunk;
    });
    req.on('end',  () => { 
      try {
        rs(JSON.parse(data));
      } catch (error) {
        rj('not json type')
      }
    })
  })
}


fpm.bindRouter(router)

fpm.run().then( () => {
    console.log('Ready to go...')
});