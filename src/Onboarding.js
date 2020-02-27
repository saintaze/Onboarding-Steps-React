import React,  {useState} from 'react';
import Step from './Step';
import WelcomeStep from './WelcomeStep';
import GoalsStep from './GoalsStep';
import AdminsStep from './AdminsStep';
import { CSSTransition, TransitionGroup, SwitchTransition } from 'react-transition-group';
import states from './states';

const Onboarding = props => {

  const [currentStep, setCurrentStep] = useState(states.WELCOME);
  const [basicInfo, setBasicInfo] = useState(null);
  const [goals, setGoals] = useState(null);
  const [admins, setAdmins] = useState(null);

  const renderCurrentStep = (currentStep) => {
    switch(currentStep){
      case states.WELCOME:
        return <WelcomeStep key='welcome' setStep={setCurrentStep} setBasicInfo={setBasicInfo}/>
      case states.GOALS:
        return <GoalsStep key='goals' setStep={setCurrentStep} setGoals={setGoals} firstName={basicInfo.firstName}/>
      case states.ADMINS:
        return <AdminsStep key='admins' setStep={setCurrentStep} setAdmins={setAdmins}/>
      default:
        return <WelcomeStep key='welcome' setStep={setCurrentStep}/>
    }
  }

  return (
    <>
    <Step>
        <TransitionGroup>
          <CSSTransition
            in={true}
            timeout={300}
            classNames="show"
            unmountOnExit
            appear
          >
            {renderCurrentStep(currentStep)}
          </CSSTransition>
        </TransitionGroup>
    </Step>


    <CSSTransition
      in={true}
      timeout={300}
      classNames="show"
      unmountOnExit
      appear
    >
      <WelcomeStep setStep={setCurrentStep} />
    </CSSTransition>
    </>
  )
}

export default Onboarding

