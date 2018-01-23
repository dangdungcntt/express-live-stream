const axios = require('axios');

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
            let info = await
            ytdl.getInfo(linkPath).catch(err => (false));

            if (!info) return false;

            let el = info.formats.find(el => {
                return typeof el.quality_label !== 'undefined';
            });

            let el720 = info.formats.find(el => {
                return typeof el.quality_label !== 'undefined' && el.quality_label === '720p';
            });

            if (el720) {
                el = el720;
            }

            return {
                title: info.title,
                url: el.url,
                quality_label: el.quality_label
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