import React from 'react';
import Modal from "../../general/components/Modal";
import NewClass from './NewClass';
const NewClassModal = props =>{
  console.log(props)
  return (
        <Modal
        show={props.showAddNewClassModal}
        onCancel={()=>{props.setAddNewClassModal(false)}}
        header={<div>Create a new class: </div>}
        contentClass="addNewStu-modal"
        footerClass="worksheet-item__modal-actions"
      >
        <NewClass {...props} cancelAddNewClassHandler={()=>{props.setAddNewClassModal(false)}} />
      </Modal>

  )

}
export default NewClassModal

