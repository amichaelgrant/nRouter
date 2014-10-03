var nRouter = require('./lib/nRouter');
var config  = require('./config/config');

var router = new nRouter();
router.listen(config.PORT, config.HOST);