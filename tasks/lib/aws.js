var AWS = require('aws-sdk');
var Promise = require('es6-promise').Promise;
var fs = require('fs');
var zlib = require('zlib');

module.exports = {
    store: function (options, callback) {
        return new Promise(function (resolve, reject) {
            AWS.config.credentials = new AWS.SharedIniFileCredentials({
                filename: options.credentials,
                profile: options.profile
            });
            
            var s3object = new AWS.S3({
                params: {
                    Bucket: options.bucket,
                    Key: options.bucketKey
                }
            });
            var stream = fs.createReadStream(options.destination).pipe(zlib.createGzip());
            s3object.upload({
                Body: stream
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
