const { Fpm } = require('yf-fpm-server');

const fpm = new Fpm();

fpm.subscribe(`#webhook/tianyi/notify`, (topic, message) => {
  console.log(topic, message);
})

fpm.run().then( () => {
    console.log('Ready to go...')
});