const { Fpm } = require('yf-fpm-server');

const fpm = new Fpm();

const router = fpm.createRouter();

router.get('/', async (ctx, next) => {
  ctx.body = '<h1>Ok</h1>';
})
router.post('/notify', async (ctx, next) =>{
  let postData = ctx.request.body
  console.log(postData);

  ctx.body = { code: 0 }
});

fpm.bindRouter(router)

fpm.run().then( () => {
    console.log('Ready to go...')
});