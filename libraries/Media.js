const axios = require('axios');
const ytdl = require('./Youtube');

module.exports = {
    /**
     *
     * @param imagePath
     * @returns {Promise<T | boolean>}
     */
    async checkImage({imagePath}) {

        return axios.get(imagePath)
            .then(response => response.headers['content-type'].search('image') !== -1)
            .catch(e => (false));
    },

    /**
     *
     * @param linkPath
     * @returns {Promise<*>}
     */
    async checkVideo({linkPath}) {
        if (linkPath.search('youtube') > -1) {
            let info = await ytdl.getInfo({url: linkPath}).catch(err => (false));

            if (!info) return false;

            let el = info.formats.find(el => {
                return typeof el.quality !== 'undefined';
            });

            let el720 = info.formats.find(el => {
                return typeof el.quality !== 'undefined' && el.quality.indexOf('720p') > -1;
            });

            if (el720) {
                el = el720;
            }

            return {
                title: info.title,
                url: el.url,
                quality: el.quality
            };
        }

        if (linkPath.match(/(http:\/\/|https:\/\/|www\.).*(\.mp4|\.mkv)/g)) {
            return {
                url: linkPath,
                title: linkPath,
                quality_label: 'unknown'
            };
        }

        return false
    }
};