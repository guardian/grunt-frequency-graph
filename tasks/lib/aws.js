var AWS = require('aws-sdk');
var Promise = require('es6-promise').Promise;
var fs = require('fs');
var zlib = require('zlib');

module.exports = {
    store: function (options, callback) {
        return new Promise(function (resolve, reject) {
            var envPrefix = options.envPrefix ? options.envPrefix + '_' : '',
                credentials;

            if (process.env[envPrefix + 'ACCESS_KEY_ID'] && process.env[envPrefix + 'SECRET_ACCESS_KEY']) {
                credentials = new AWS.EnvironmentCredentials(options.envPrefix);
            } else {
                credentials = new AWS.SharedIniFileCredentials({
                    filename: options.credentials,
                    profile: options.profile
                });
            }
            AWS.config.credentials = credentials;
            
            var s3object = new AWS.S3({
                params: {
                    Bucket: options.bucket,
                    Key: options.bucketKey
                }
            });
            var stream = fs.createReadStream(options.destination);
            s3object.upload({
                Body: stream,
                ContentType: 'text/html; charset=UTF-8',
                ACL:'public-read'
            })
            .send(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
};
