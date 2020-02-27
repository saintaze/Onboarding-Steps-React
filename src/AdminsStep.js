import React, {useEffect, useState} from 'react';
import { Form, Button } from 'semantic-ui-react'
import states from './states';
import ErrorMessage from './ErrorMessage';
import { TransitionGroup} from 'react-transition-group';
import InputField from './InputField';


const AdminsStep = ({setAdmins, setStep}) => {
  const [adminEmails, setAdminEmails] = useState(['']);
  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (errors.length === 0 && touched) {
      setAdmins(adminEmails.filter(e => e.length > 0))
      // setStep(states.ADMINS)
    }
  }, [errors])

  const validate = () => {
    const errors = []
    if (adminEmails.every(e => e.trim().length === 0)) {
      errors.push('Set atleast one admin')
    }
    if (adminEmails.some(e => e.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()))){
      errors.push('Email format is incorrect')
    }
    setErrors(errors)
  }

  const handleChange = (e, i) => {
    setAdminEmails(adminEmails.map((email, index)=> (
      index === i ? e.target.value : email 
    )))
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
    <div>
      <h1>Way to go!</h1>
      <ErrorMessage errors={errors} title='Admins help you to delegate tasks'/>
      <p>Let us know who should be admins in your setup. Then you will be on your way!</p>
      <Form> 
        {renderInputs()}
        <div style={{display: 'flex', justifyContent:"center"}}>
          <Button onClick={()=> setAdminEmails([...adminEmails, ''])} color='pink' circular icon='plus' textAlign='center' />
        </div>
        <Form.Group widths='equal'>
          <Form.Button onClick={() => setStep(states.GOALS)} fluid size='large' color='blue' content='Back' />
          <Form.Button onClick={validate} fluid size='large' color='green' content='Finish' />
        </Form.Group>
      </Form>
    </div>
  );
}

export default AdminsStep;






