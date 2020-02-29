import React, {useEffect, useState} from 'react';
import { Form, Button } from 'semantic-ui-react'
import states from './states';
import ErrorMessage from './ErrorMessage';
import { TransitionGroup} from 'react-transition-group';
import InputField from './InputField';
import validator from './Validator';

const AdminsStep = ({setAdmins, setStep, setStepDirection}) => {
  const [adminEmails, setAdminEmails] = useState(['']);
  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (errors.length === 0 && touched) {
      setAdmins(adminEmails.filter(e => e.length > 0));
      setStepDirection('prev');
    }
  }, [errors])

  const goBack = () => {
    setStepDirection('prev');
    setStep(states.GOALS);
  }

  const validate = () => {
    const errors = []
    if (adminEmails.every(e => validator.isEmpty(e))) {
      errors.push('Set atleast one admin');
    }
    if (adminEmails.some(e => validator.isNotEmail(e))){
      errors.push('Email format is incorrect');
    }
    setErrors(errors);
  }

  const handleChange = (e, i) => {
    setAdminEmails(adminEmails.map((email, index)=> (
      index === i ? e.target.value : email 
    )));
  }

  const renderInputs = () => (
    <TransitionGroup component={null}>
      {adminEmails.map((_, i)=> (
        <InputField 
          value={adminEmails[i]} 
          i={i} 
          setTouched={setTouched} 
          handleChange={handleChange} 
          key={i}
          />
      ))}
    </TransitionGroup>
  )

  return (
    <>
      <h1>Way to go!</h1>
      <ErrorMessage errors={errors} title='Admins help you to delegate tasks'/>
      <p>Let us know who should be admins in your setup. Then you will be on your way!</p>
      <Form> 
        {renderInputs()}
        <div style={{display: 'flex', justifyContent:"center"}}>
          <Button onClick={()=> setAdminEmails([...adminEmails, ''])} color='pink' circular icon='plus' />
        </div>
        <Form.Group widths='equal'>
          <Form.Button onClick={goBack} fluid size='large' color='blue' content='Back' />
          <Form.Button onClick={validate} fluid size='large' color='green' content='Finish' />
        </Form.Group>
      </Form>
     </>
  );
}

export default AdminsStep;






