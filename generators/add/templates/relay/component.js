'use strict';

import React from 'react';
import radium from 'radium';
import Wrapper from 'cat-components/lib/Wrapper';

import Normalize from 'componentsShare/Normalize';
import <%= componentName %>Container from 'containers/<%= componentName %>Container';

@radium
class <%= componentName %> extends React.Component {
  render() {
    return (
      <div>
        <Normalize />

        This is <%= componentName %>!
        <<%= componentName %>Container />
      </div>
    );
  }
}

/* eslint-disable */
export default ({radiumConfig}) => (
  <Wrapper radiumConfig={radiumConfig}>
    <<%= componentName %> />
  </Wrapper>
);
/* eslint-enable */
