let axios = require('axios');

/**
 * check link is image file
 * 
 * @param {*} imagePath 
 * @return bollean
 */
module.exports = (imagePath) => {
    return axios.get(imagePath)
        .then(response => response.headers['content-type'].search('image') != -1 ? true : false)
        .catch(e => (false));
}