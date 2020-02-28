import React, {useState, useEffect} from 'react';
import { Form, Input } from 'semantic-ui-react'
import states from './states';
import useInputState from './useInputState';
import ErrorMessage from './ErrorMessage';

const GoalsStep = ({firstName, setGoals, setStep}) => {
  const [firstGoal, setFirstGoal] = useInputState('');
  const [secondGoal, setSecondGoal] = useInputState('');
  const [thirdGoal, setThirdGoal] = useInputState('');
  const [errors, setErrors] = useState([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (errors.length === 0 && touched) {
      setGoals([firstGoal, secondGoal, thirdGoal].filter(g => g.length > 0))
      setStep(states.ADMINS)
    }
  }, [errors])

  const validate = () => {
    const errors = []
    if ([firstGoal, secondGoal, thirdGoal].every(g => g.trim().length === 0)) {
      errors.push('Set atleast one goal')
    }
    setErrors(errors)
  }

  return (
    <>
      <h1>Hi {firstName}!</h1>
      <ErrorMessage errors={errors} title='Knowing goals help us to personalize your experience' />
      <p>What are your main goals with Slayte?</p>
      <Form>
        <Form.Field
          autoFocus
          id='goal-1'
          control={Input}
          label='1'
          placeholder='Goal 1'
          name="goal1"
          inline
          value={firstGoal}
          onChange={setFirstGoal}
          onFocus={() => setTouched(true)}
        />
        <Form.Field
          inline
          id='goal-2'
          control={Input}
          label='2'
          placeholder='Goal 2'
          name="goal2"
          value={secondGoal}
          onChange={setSecondGoal}
          onFocus={() => setTouched(true)}
        />
        <Form.Field
          inline
          id='goal-3'
          control={Input}
          label='3'
          placeholder='Goal 3'
          name="goal3"
          value={thirdGoal}
          onChange={setThirdGoal}
          onFocus={() => setTouched(true)}
        />
        <Form.Group widths='equal'>
          <Form.Button onClick={() => setStep(states.WELCOME)} fluid size='large' color='blue' content='Back' />
          <Form.Button onClick={validate} fluid size='large' color='violet' content='Proceed' />
        </Form.Group>
      </Form>
    </>
  );
}

export default GoalsStep;






