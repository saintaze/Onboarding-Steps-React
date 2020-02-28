import React,  {useState, useEffect} from 'react';
import { Grid, Loader } from 'semantic-ui-react'
import WelcomeStep from './WelcomeStep';
import GoalsStep from './GoalsStep';
import AdminsStep from './AdminsStep';
import ModalMessage from './ModalMessage';
import states from './states';
import firebase from './firebase';

const Onboarding = props => {

  const [currentStep, setCurrentStep] = useState(states.WELCOME);
  const [basicInfo, setBasicInfo] = useState(null);
  const [goals, setGoals] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [modalMessage, setModalMessage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    (async () => {
      if (basicInfo && goals && admins) {
        setShowSpinner(true);
        try {
          const {user: {uid}} = await firebase.signUp(basicInfo.email, basicInfo.password);
          await firebase.setUserDetails(uid, { basicInfo, goals, admins });
          setModalMessage({ 
            title: 'Onboarding Successful!', 
            message: 'Welcome To Slayte! You are now in a whole new game' 
          });
        } catch(e) {
          setModalMessage({title: e.code, message: e.message});
          resetData();
        }
        setShowModal(true)
        setCurrentStep(states.WELCOME);
        setShowSpinner(false)
      }
    })()
  }, [basicInfo, goals, admins]);

  const resetData = () => {
    setBasicInfo(null);
    setGoals(null);
    setAdmins(null);
  }

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
      <ModalMessage {...modalMessage} showModal={showModal} setShowModal={setShowModal}/>
      <Grid textAlign='center' style={{ minHeight: '100vh' }} verticalAlign='middle'>
        <Grid.Column className="container">
          <Loader active={showSpinner} className='spinner'/>
          {renderCurrentStep(currentStep)}
        </Grid.Column>
      </Grid>    
    </>
  )

}

export default Onboarding;

