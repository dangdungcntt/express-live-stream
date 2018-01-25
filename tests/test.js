const axios = require('axios');
const fs = require('fs');

axios.get('http://www.youtube.com/get_video_info111123123?video_id=123123')
    .then(res => console.log(res.data))
.catch(err => console.log(err => console.log(err.toString())));


