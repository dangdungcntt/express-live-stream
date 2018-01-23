let express = require('express');
let router = express.Router();
let streamController = require('../controllers/StreamController');
let checker = require('../helpers/checkVideo');

//test


stream = new streamController();

router.get('/', stream.getStreamUrl);
router.post('/', stream.getStreamUrl);

router.get('/info/:id', stream.getInfo);

router.get('/image', async (req, res) => {
    // let linkPath = 'https://www.youtube.com/watch?v=g20t_K9dlhU';
    let linkPath = 'http://seooul.com/uploads/videos/22-23-10-09-28-10-2017.mp4';
    json = await checker(linkPath);

    res.send('<video controls><source src="' + json.url + '" type="video/mp4"/></video>');
});


module.exports = router;