# grunt-frequency-graph

> Generate a frequency graph of static assets changes

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-frequency-graph --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-frequency-graph');
```

## The "frequency_graph" task

Use [asset-frequency-graph](https://github.com/guardian/asset-frequency-graph) to generate a report of you repository and upload the result to an AWS S3 bucket.

### Overview
In your project's Gruntfile, add a section named `frequency_graph` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  frequency_graph: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.basePath
Type: `String`
Default value: `'.'`

Path of the repository to be analyzed.

#### options.staticFolder
Type: `String`
Default value: `'lib'`

Folder containing JavaScript assets.

#### options.seeds
Type: `Array`
Default value: `['index.js']`

List of root files. The tool will analyze the dependencies of these files.

#### options.requireConfig
Type: `String`
Default value: `['requirejs.js']`

Requirejs configuration file, used to resolve dependencies of seed files.

#### options.gruntJit
Type: `Boolean`
Default value: `false`

Whether the requirejs configuration is used by grunt jit.

#### options.destination
Type: `String`
Default value: `'tmp/frequency_graph.html'`

Where to write the report.

#### options.envPrefix
Type: `String`
Default value: `''`

Prefix to use for AWS environment variables.

#### options.credentials
Type: `String`
Default value: `null`

Path of AWS credentials file. `null` equals `~/.aws/credentials`.

#### options.profile
Type: `String`
Default value: `null`

AWS credentials profile. `null` equals `'default'`.

#### options.bucket
Type: `String`
Default value: `'asset-frequency-graph'`

AWS S3 bucket where the report is stored.

#### options.bucketKey
Type: `String`
Default value: `'index.html'`

Key in the S3 bucket.

#### options.limit
Type: `Number`
Default value: `null`

Limit the number of commits analyzed. `null` for no limit.

#### options.verbose
Type: `Boolean`
Default value: `'false'`

Generate a more verbose result, including the full history of the repository. Be careful, the report might be huge.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.1.0 Initial commit 
