let express = require('express');
let router = express.Router();
let streamController = require('../controllers/StreamController');

stream = new streamController();

router.get('/', stream.getStreamUrl);
router.post('/', stream.getStreamUrl);

router.get('/info/:id', stream.getInfo);

module.exports = router;