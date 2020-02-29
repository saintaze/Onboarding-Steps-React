import React  from 'react'
import { Button, Modal } from 'semantic-ui-react'

const ModalMessage = ({ title, message, showModal, setShowModal}) =>  {
  return (
    <Modal size='tiny' open={showModal} onClose={()=>setShowModal(false)}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <p>{message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button className="modalBtn" negative onClick={()=>setShowModal(false)}>Close</Button>
        <Button
          className="modalBtn"
          onClick={()=>setShowModal(false)}
          positive
          content='OK'
        />
      </Modal.Actions>
    </Modal>
  )
}

export default ModalMessage;