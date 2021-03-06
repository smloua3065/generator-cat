'use strict';

import assert from 'yeoman-assert';

export default ({
  website,
  graphql,
  server
}) => {
  it('.babelrc', () => {
    let presets = [
      'env',
      'stage-0'
    ];
    let plugins = [
      'transform-object-assign',
      ['module-resolver', {
        root: ['./src']
      }]
    ];
    const alias = {
      utils: 'utils'
    };

    if(website) {
      presets = [
        'react',
        ...presets
      ];
      plugins = [
        'transform-decorators-legacy',
        ...plugins
      ];
      alias.public = 'public';
      alias.components = 'components';
      alias.componentsShare = 'components/share';

      if(graphql) {
        plugins = [
          'relay',
          ...plugins
        ];
        alias.containers = 'containers';
      }
    }

    if(server) {
      alias.routers = 'routers';

      if(graphql)
        alias.schemas = 'schemas';
    }

    assert.jsonFileContent('package.json', {
      scripts: {
        babel: 'rm -rf ./lib && babel src --out-dir lib --ignore __tests__',
        'babel:watch': 'rm -rf ./lib && babel -w src --out-dir lib --ignore __tests__'
      }
    });

    assert.jsonFileContent('.babelrc', {presets});
    assert.jsonFileContent('.babelrc', {plugins});
    assert.jsonFileContent('.babelrc', {
      plugins: [
        ...plugins.slice(0, plugins.length - 1),
        ['module-resolver', {
          alias
        }]
      ]
    });
  });
};
