import React from 'react'
import { Modal } from 'react-bootstrap'

export const Modals = (props) => {
  return (
     <Modal show={props.open} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.data.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>ID: {props.data.id}</p>
        </Modal.Body>
      </Modal>
  )
}
