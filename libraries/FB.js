var config = require('../config/config');
var axios = require('axios');

const FB = {
    /**
     *
     * @param id
     * @param description
     * @param privacy
     * @param access_token
     * @returns {Promise<T | {data: {}}>}
     */
    createStream({id = 'me', description = null, privacy = 'EVERYONE', access_token}) {
        let exist = config.privacy.includes(privacy);
        if (!exist) {
            privacy = 'EVERYONE';
        }
        return axios.post(`${config.graph}/${id}/live_videos`, {
            access_token,
            description: description,
            privacy: '{"value" : "' + privacy + '"}'
        }).catch(() => ({data: {}}));
    },

    /**
     *
     * @param postId
     * @param access_token
     * @returns {Promise<Promise|*|Promise<T | {}>>}
     */
    async getInfo({postId, access_token}) {
        let fields = 'fields=live_views,status,secure_stream_url,stream_type,stream_url';

        return axios.get(`${config.graph}/${postId}/?${fields}&access_token=${access_token}`)
            .catch(() => ({}));
    },

    /**
     *
     * @param postId
     * @param access_token
     * @returns {Promise<{success: boolean}>}
     */
    async endLive({postId, access_token}) {
        let response = await axios.post(`${config.graph}/${postId}`, {
            access_token,
            end_live_video: true
        }).catch((err) => ({data: {}}));

        return {success: !!response.data.id}
    },

    /**
     *
     * @param postId
     * @param access_token
     * @returns {Promise<{success: boolean|*|Event}>}
     */
    async deleteLive({postId, access_token}) {
        let response = await axios.delete(`${config.graph}/${postId}?access_token=${access_token}`)
            .catch(() => ({data: {}}));

        return {success: response.data.success};
    }

};

module.exports = FB;