import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Grid } from 'semantic-ui-react';

const Step = ({ stepDirection, currentStep, renderCurrentStep}) => {

  const childFactoryCreator = classNames => {
    return child => React.cloneElement(child, { classNames })
  }

  return (
    <TransitionGroup component={null} childFactory={childFactoryCreator(stepDirection)}>
      <CSSTransition
        timeout={300}
        classNames={stepDirection}
        key={currentStep}
        unmountOnExit
      >
        <div className='page' >
          <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column className="container">
              {renderCurrentStep(currentStep)}
            </Grid.Column>
          </Grid>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default Step;