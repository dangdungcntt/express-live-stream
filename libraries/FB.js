var config = require('../config/config');
var axios = require('axios');

class FB {
    constructor(token) {
        if (token == '' && typeof (token) != 'string')
            throw new TypeError('Token must is String');
        this.token = token;
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
        return axios.post(`${config.graph}/${id}/live_videos`, {
            access_token: this.token,
            description: description,
            privacy: '{"value" : "' + privacy + '"}'
        }).catch(() => ({data: {}}));
    }

    /**
     * get status of live video id
     *
     * @param postId
     */
    getInfo(postId) {
        let fields = 'fields=live_views,status,secure_stream_url,stream_type,stream_url';

        return axios.get(`${config.graph}/${postId}/?${fields}&access_token=${this.token}`)
            .catch(() => ({}));
    }

    async endLive({postId}) {
        let response = await axios.post(`${config.graph}/${postId}`, {
            access_token: this.token,
            end_live_video: true
        }).catch((err) => ({data: {}}));

        if (response.data.id) {
            return {success: true}
        }

        return {success: false}
    }

    async deleteLive({postId}) {
        let response = await axios.delete(`${config.graph}/${postId}?access_token=${this.token}`)
            .catch(() => ({data: {}}));

        return {success: response.data.success};
    }

}

module.exports = FB;