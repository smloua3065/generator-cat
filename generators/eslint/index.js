'use strict';

const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  initializing() {
    this.props = {
      plugins: this.config.get('plugins') || []
    };
  }

  writing() {
    // pkg
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const pkg = extend({
      scripts: {
        lint: 'eslint --cache ./src ./bin --ext .js',
        'lint:watch': 'esw --cache ./src ./bin --ext .js -w --color'
      }
    }, currentPkg);
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // files
    this.fs.copyTpl(
      this.templatePath('eslintrc.js'),
      this.destinationPath('.eslintrc.js'), {
        react: this.props.plugins.indexOf('react') !== -1
      }
    );
  }

  install() {
    const modules = [
      'eslint',
      'eslint-watch',
      'eslint-config-google',
      'eslint-plugin-import',
      'eslint-import-resolver-babel-module',
      'babel-eslint'
    ];

    if(this.props.plugins.indexOf('react') !== -1)
      modules.push('eslint-plugin-react');

    this.yarnInstall(modules, {dev: true});
  }
};
