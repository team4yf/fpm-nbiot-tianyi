const { Fpm } = require('yf-fpm-server');
const Biz = require('./biz');

const fpm = new Fpm();

const biz = fpm.createBiz('0.0.1');

biz.addSubModules('tianyi', Biz(fpm));

fpm.addBizModules(biz);

fpm.run().then( () => {
    console.log('Ready to go...')
});