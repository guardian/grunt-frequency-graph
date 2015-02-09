/*
 * grunt-frequency-graph
 * https://github.com/guardian/grunt-frequency-graph
 *
 * Copyright (c) 2015 Fabio Crisci
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var asset_frequency_graph = require('asset-frequency-graph');
  var aws = require('./lib/aws');


  grunt.registerMultiTask('frequency_graph', 'Generate a frequency graph of static assets changes', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      basePath: '.',
      staticFolder: 'lib',
      seeds: [
        'index.js'
      ],
      requireConfig: 'requirejs.js',
      gruntJit: false,
      destination: 'tmp/frequency_graph.html',
      limit: null,
      verbose: false,
      credentials: null,
      profile: null,
      envPrefix: '',
      bucket: 'asset-frequency-graph',
      bucketKey: 'index.html',
      fromDisk: false,
      fullPage: true,
      costDays: 15,
      distribution: null
    });

    var done = this.async();
    asset_frequency_graph(options, function () {
      aws.store(options).then(function (data) {
        grunt.log.ok('Graph saved to bucket \'' + options.bucket + '\' key \'' + options.bucketKey + '\'');
        grunt.log.ok('Location \'' + data.Location + '\'');
        done();
      }, function (err) {
        console.error(err);
        grunt.fail.fatal(err);
        done(false);
      });
    });
  });

};
