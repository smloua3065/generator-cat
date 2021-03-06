'use strict';

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.addDevDependencies([
      'babel-plugin-relay',
      'relay-compiler'
    ]);

    this.addDependencies([
      'cat-components',
      'cat-graphql',
      'cat-utils',
      'fetch-everywhere',
      'babel-polyfill'
    ]);

    this.addAlias({
      constants: 'constants',
      containers: 'containers'
    });
  }

  default() {
    /* istanbul ignore next */
    if(!this.config.get('cat')) {
      this.composeWith(require.resolve('./../add'), {
        item: 'relay',
        name: 'index',
        queryName: 'index'
      });
    }
  }

  writing() {
    this.writePkgScripts({
      graphql: 'babel src/schemas --out-dir lib/schemas && build-graphql --schema ./lib/schemas/schema.js',
      relay: 'relay-compiler --src ./src --schema ./schema.graphql',
      'relay:watch': 'relay-compiler --src ./src --schema ./schema.graphql --watch'
    });

    this.writeFiles({
      'environment.js': 'src/utils/environment.js'
    });
  }

  install() {
    this.addInstall();
  }
};
