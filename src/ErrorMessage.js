import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Message } from 'semantic-ui-react'

const ErrorMessage = ({errors, title}) => {
  return (
    <CSSTransition
      in={errors.length > 0}
      timeout={300}
      classNames="show"
      unmountOnExit
    >
      {errors.length ? <Message
        size="small"
        error
        header={title}
        list={errors}
      /> : <></>}
    </CSSTransition>
  );
}

export default ErrorMessage;