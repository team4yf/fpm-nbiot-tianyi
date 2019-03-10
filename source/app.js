const { Fpm } = require('yf-fpm-server');

const fpm = new Fpm({ disableBodyParser: '/notify'});

const router = fpm.createRouter();

router.post('/notify', async (ctx) =>{
  let postData = ctx
  // console.log(postData);

  const { req } = ctx;

  //创建空字符叠加数据片段
  let data = '';

  //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
  req.on('data',  (chunk) => {
    // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    data += chunk;
  });

  // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
  //注册end事件，所有数据接收完成会执行一次该方法
  req.on('end',  () => { 
    console.log(data);
    ctx.body = { code: 0 }
  })
  ctx.body = { code: 0 }
});


fpm.bindRouter(router)

fpm.run().then( () => {
    console.log('Ready to go...')
});