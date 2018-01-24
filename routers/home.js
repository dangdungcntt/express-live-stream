let express = require('express');
let router = express.Router();
let stream = require('../controllers/StreamController');
let Media = require('../libraries/Media');


router.get('/videos', stream.getStreamUrl);
router.post('/videos', stream.getStreamUrl);

router.get('/videos/:id', stream.getInfo);
router.post('/videos/:id', stream.updateInfo);
router.delete('/videos/:id', stream.delete);

router.get('/image', async (req, res) => {
    // let linkPath = 'https://www.youtube.com/watch?v=g20t_K9dlhU';
    let linkPath = 'http://seooul.com/uploads/videos/22-23-10-09-28-10-2017.mp4';
    json = await Media.checkVideo(linkPath);

    res.send('<video controls><source src="' + json.url + '" type="video/mp4"/></video>');
});


module.exports = router;