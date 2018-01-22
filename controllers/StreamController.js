let FB = require('../libraries/FB');
let tokenmodel = require('../models/Token');
let config = require('../config/config');
let cmd = require('node-cmd');
let cmdrun = require('../config/cmdrun');

fb = new FB('EAACW5Fg5N2IBAGa3qDwDJfqWBLBnjIdZBfvJpzAXcvkqHwP9Ol2ekv97lwbGTNoDEZBS5DcOpAVIXAaBZCJR3xjZCcSeyWCWa23ymUGyYglEadPQELHRQuBZBerB9MPQjnYAUa2hRFpZBNkI932hpHt0gUP2QhGI4t07lCUen9AQ5T9r7mB9QU')


class StreamController {

    async getStreamUrl(req, res) {
        let response = await fb.createStream(req.body);
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

    }

    async getInfo(req, res) {
        let postId = req.params.id;
        let status = await fb.getInfo(postId);

        if (!status.data) {
            return res.status(404).json(status.data);
        }

        return res.status(200).json(status.data);
    }
}

module.exports = StreamController;