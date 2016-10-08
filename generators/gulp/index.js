'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('type', {
      type: String,
      required: false,
      desc: 'Type'
    });
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'), {
        type: this.options.type
      }
    );
    this.fs.copy(
      this.templatePath('test.js'),
      this.destinationPath('gulp-tasks/test.js')
    );
  },

  install: function() {
    this.npmInstall([
      'gulp',
      'gulp-nsp',
      'gulp-exclude-gitignore',
      'gulp-mocha',
      'gulp-istanbul',
      'gulp-plumber',
      'gulp-require-tasks',
      'gulp-watch',
      'gulp-task-listing'
    ], {saveDev: true});
  }
});
