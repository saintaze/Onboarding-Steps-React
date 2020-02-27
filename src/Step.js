import React from 'react';
import { Grid } from 'semantic-ui-react';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';

import './Step.css';

const Step = (props) => {
  return ( 
    <Grid textAlign='center' style={{ minHeight: '100vh' }} verticalAlign='middle'>
      <Grid.Column className="container">

          {props.children}

      </Grid.Column>
    </Grid>

   );
}
 
export default Step;