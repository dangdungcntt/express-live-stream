let express = require('express');
let router = express.Router();
let streamController = require('../controllers/StreamController');

stream = new streamController();

router.get('/videos', stream.getStreamUrl);
router.post('/videos', stream.getStreamUrl);

router.get('/videos/:id', stream.getInfo);
router.post('/videos/:id', stream.updateInfo);
router.delete('/videos/:id', stream.delete);

module.exports = router;