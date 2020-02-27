import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Input } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'

const InputField = ({ i, setTouched, handleChange, value }) => {
  return (
    <CSSTransition
      in={true}
      timeout={300 }
      classNames="show"
      key={i}
    >
      <Form.Field
        id={`email ${i + 1}`}
        control={Input}
        placeholder={`Admin Email ${i + 1}`}
        name="adminEmail"
        onFocus={() => setTouched(true)}
        value={value}
        onChange={(e) => { handleChange(e, i) }}
      />
    </CSSTransition>
  );
}

export default InputField;