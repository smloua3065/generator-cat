'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'eslint',
      'eslint-watch',
      'eslint-config-google',
      'eslint-plugin-import',
      'eslint-import-resolver-babel-module',
      'babel-eslint'
    ], plugin => {
      switch(plugin) {
        case 'react': return ['eslint-plugin-react'];
      }
    });
  }

  writing() {
    this.writePkgScripts({
      lint: 'eslint --cache ./src --ext .js',
      'lint:watch': 'esw --cache ./src --ext .js -w --color'
    });

    this.writeFiles({
      'eslintrc.js': ['.eslintrc.js', {
        test: this.checkPlugins('test'),
        react: this.checkPlugins('react')
      }]
    });
  }

  install() {
    this.addInstall(true);
  }
};
