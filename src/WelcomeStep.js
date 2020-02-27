import React, { useEffect, useState } from 'react';
import { Form, Input, Button  } from 'semantic-ui-react';
import states from './states';
import useInputState from './useInputState';
import ErrorMessage from './ErrorMessage';


const WelcomeStep = ({setStep, setBasicInfo}) => {
  const [firstName, setFirstName] = useInputState('');
  const [lastName, setLastName] = useInputState('');
  const [email, setEmail] = useInputState('');
  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState(false);

  const validate = () => {
    const errors = []
    if(firstName.trim().length === 0) errors.push('First name can\'t be empty') 
    if(lastName.trim().length === 0) errors.push('Last name can\'t be empty') 
    if(email.trim().length === 0) errors.push('Email can\'t be empty') 
    if(email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.push('Email format is incorrect') 
    setErrors(errors);
  }

  useEffect(() => {
    if(errors.length === 0 && touched){
      setBasicInfo({firstName, lastName, email})
      setStep(states.GOALS)
    }
  }, [errors])

  return ( 
    <div>
      <h1>Hi there!</h1>
      <ErrorMessage errors={errors} title='Profile Info strikes up your uniqueness' />
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            onFocus={() => setTouched(true)}
            id='first-name'
            control={Input}
            label='First name'
            placeholder='First name'
            name='firstName'
            value={firstName}
            onChange={setFirstName}
          />
          <Form.Field
            onFocus={() => setTouched(true)}
            id='last-name'
            control={Input}
            label='Last name'
            placeholder='Last name'
            name="lastName"
            value={lastName}
            onChange={setLastName}
          />
        </Form.Group>
        <Form.Field
          title='Please enter valid email address'
          onFocus={() => setTouched(true)}
          id='email'
          control={Input}
          label='Email'
          placeholder='Email'
          type="email"
          name="Email"
          value={email}
          onChange={setEmail}
        />
        <Button onClick={validate} type="submit" color='violet' fluid size='large'>
          Proceed
        </Button>
      </Form>
    </div>
  );
}
 
export default WelcomeStep;






