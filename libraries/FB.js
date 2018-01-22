var config = require('../config/config');
var axios = require('axios');

class FB {
    constructor(token) {
        if (token == '' && typeof (token) != 'string')
            throw new TypeError('Token must is String');
        this.token = '?access_token=' + token;
    }

    getName() {
        return axios.get(config.graph + 'me' + this.token + '&fields=id,name');
    }

    /**
     * create a stream in Facebook
     *
     * @param id
     * @param description
     * @param privacy
     * @returns {*|AxiosPromise<any>}
     */
    createStream({id = 'me', description = null, privacy = 'EVERYONE'}) {
        let exist = config.privacy.includes(privacy);
        if (!exist) {
            privacy = 'EVERYONE';
        }
        return axios.post(config.graph + id + '/live_videos' + this.token, {
            description: description,
            privacy: '{"value" : "' + privacy + '"}',
        }).catch(() => ({data: {}}));
    }

    /**
     * get status of live video id
     *
     * @param postId
     */
    getInfo(postId) {
        return axios.get(config.graph + postId + '/' + this.token + '&fields=live_views,status,secure_stream_url,stream_type,stream_url')
            .catch(() => ({}));
    }

}

module.exports = FB;