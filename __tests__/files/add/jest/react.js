'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/__tests__/components/Index.js', () => {
    assert.fileContent(
      'src/__tests__/components/Index.js',
      'import Index from \'components/Index\''
    );
    assert.fileContent(
      'src/__tests__/components/Index.js',
      'it(\'Index\', () => {'
    );
    assert.fileContent(
      'src/__tests__/components/Index.js',
      '<Index />'
    );
    assert.fileContent(
      'src/__tests__/components/Index.js',
      '<div>This is Index!</div> // eslint-disable-line react/jsx-key'
    );
  });
};
