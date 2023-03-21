const morganBody = require('morgan-body');

module.exports = function(router) {
  router.use(morganBody ({
    stream: {
      write: (message) => 
      console.log(message.trim())
    },
  }));
};
