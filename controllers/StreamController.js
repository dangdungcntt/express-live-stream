let fb = require('../libraries/FB');
let tokenmodel = require('../models/Token');
let config = require('../config/config');
let cmd = require('node-cmd');
let cmdrun = require('../config/cmdrun');

let token = 'EAACW5Fg5N2IBAGa3qDwDJfqWBLBnjIdZBfvJpzAXcvkqHwP9Ol2ekv97lwbGTNoDEZBS5DcOpAVIXAaBZCJR3xjZCcSeyWCWa23ymUGyYglEadPQELHRQuBZBerB9MPQjnYAUa2hRFpZBNkI932hpHt0gUP2QhGI4t07lCUen9AQ5T9r7mB9QU';


const StreamController = {

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getStreamUrl(req, res) {

        let {
            id, description, privacy, file
        } = req.body;

        let response = await fb.createStream({id, description, privacy, access_token: token});
        let data = response.data;
        console.log(data);
        data.stream_url = data.stream_url.replace('rtmps://rtmp.facebook.com:443/rtmp/', '');
        res.json(data);

        // cmd.get(
        //     cmdrun.runLive
        //         .replace('${token}', data.stream_url)
        //         .replace('${file}', req.body.file)
        //         .replace('${loop}', '1')
        // );

        console.log(cmdrun.runLive
            .replace('${token}', data.stream_url)
            .replace('${file}', req.body.file)
            .replace('${loop}', '1'));

    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*|JSON|Promise<any>>}
     */
    async getInfo(req, res) {
        let postId = req.params.id;
        let status = await fb.getInfo({postId, access_token: token});

        if (!status.data) {
            return res.status(404).json(status.data);
        }

        return res.status(200).json(status.data);
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async updateInfo(req, res) {
        let postId = req.params.id;
        let { action } = req.body;
        switch (action) {
            case 'end_live_video':
                let data = await fb.endLive({postId, access_token: token});
                if(!data.success) {
                    res.status(400);
                }
                return res.send(data);
            default : res.send({});
        }
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async delete(req, res) {
        let postId = req.params.id;
        let data = await fb.deleteLive({postId, access_token: token});
        if (!data.success) {
            res.status(400);
        }
        res.send(data);
    }
};

module.exports = StreamController;