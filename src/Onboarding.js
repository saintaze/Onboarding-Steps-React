import React,  {useState, useEffect} from 'react';
import { Loader } from 'semantic-ui-react'
import WelcomeStep from './WelcomeStep';
import GoalsStep from './GoalsStep';
import AdminsStep from './AdminsStep';
import ModalMessage from './ModalMessage';
import states from './states';
import firebase from './firebase';
import Step from './Step';

const Onboarding = props => {

  const [currentStep, setCurrentStep] = useState(states.WELCOME);
  const [basicInfo, setBasicInfo] = useState(null);
  const [goals, setGoals] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [stepDirection, setStepDirection] = useState('next');

  useEffect(() => {
    (async () => {
      if (basicInfo && goals && admins) {
        setShowSpinner(true);
        await storeData();
        setShowModal(true)
        setCurrentStep(states.WELCOME);
        setShowSpinner(false);
        resetData();
      }
    })()
  }, [basicInfo, goals, admins]);

  const resetData = () => {
    setBasicInfo(null);
    setGoals(null);
    setAdmins(null);
  }

  const storeData = async () => {
    try {
      const { user: { uid } } = await firebase.signUp(basicInfo.email, basicInfo.password);
      await firebase.setUserDetails(uid, { basicInfo, goals, admins });
      setModalMessage({
        title: 'Onboarding Successful!',
        message: 'Welcome To Slayte! You are now in a whole new game'
      });
    } catch (e) {
      setModalMessage({ title: e.code, message: e.message });
    }
  }

  const renderCurrentStep = (currentStep) => {
    switch(currentStep){
      case states.WELCOME:
        return <WelcomeStep setStepDirection={setStepDirection} setStep={setCurrentStep} setBasicInfo={setBasicInfo} />
      case states.GOALS:
        return <GoalsStep setStepDirection={setStepDirection} setStep={setCurrentStep} setGoals={setGoals} firstName={basicInfo.firstName} />
      case states.ADMINS:
        return <AdminsStep setStepDirection={setStepDirection} setStep={setCurrentStep} setAdmins={setAdmins} />
      default:
        return <WelcomeStep setStepDirection={setStepDirection} setStep={setCurrentStep} />
    }
  }

  return (
    <>
      <ModalMessage {...modalMessage} showModal={showModal} setShowModal={setShowModal}/>        
      <Loader active={showSpinner} className='spinner'/>
      <Step stepDirection={stepDirection} currentStep={currentStep} renderCurrentStep={renderCurrentStep} />
    </>
  )

}

export default Onboarding;
