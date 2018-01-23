const Media = require('../libraries/media');

let img = 'https://scontent.fhan2-2.fna.fbcdn.net/v/t1.0-1/p50x50/15578812_2063545387205036_3839048549796851743_n.jpg?oh=2f65df51f23b7151c14c4a9bafc188a5&oe=5AEFBA18';
Media.checkImage({imagePath: img}).then(res => console.log(res));