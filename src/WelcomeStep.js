import React, { useEffect, useState } from 'react';
import { Form, Input, Button  } from 'semantic-ui-react';
import states from './states';
import useInputState from './useInputState';
import ErrorMessage from './ErrorMessage';
import validator from './Validator';
 
const WelcomeStep = ({ setStep, setBasicInfo, setStepDirection}) => {
  const [firstName, setFirstName] = useInputState('');
  const [lastName, setLastName] = useInputState('');
  const [email, setEmail] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState(false);

  const validate = () => {
    const errors = [];
    if (validator.isEmpty(firstName)) errors.push('First name can\'t be empty');
    if (validator.isEmpty(lastName)) errors.push('Last name can\'t be empty');
    if (validator.isEmpty(email)) errors.push('Email can\'t be empty');
    if (validator.isEmpty(password)) errors.push('Password can\'t be empty');
    if (validator.isShorterThan(password, 6)) errors.push('Password must be 6 characters or more');
    if (validator.isNotEmail(email)) errors.push('Email format is incorrect');
    setErrors(errors);
  }

  useEffect(() => {
    if(errors.length === 0 && touched){
      setBasicInfo({firstName, lastName, email, password});
      setStep(states.GOALS);
      setStepDirection('next');
    }
  }, [errors])

  return (
     <>
      <h1>Hi there!</h1>
      <ErrorMessage errors={errors} title='Profile Info strikes up your uniqueness' />
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            autoFocus
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
        <Form.Field
          onFocus={() => setTouched(true)}
          id='password'
          control={Input}
          label='Password'
          placeholder='Password'
          type="password"
          name="Password"
          value={password}
          onChange={setPassword}
        />
        <Button onClick={validate} type="submit" color='violet' fluid size='large'>
          Proceed
        </Button>
      </Form>
    </>
  );
}
 
export default WelcomeStep;






