import React,  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from "react-bootstrap";

function Homepage(){
  const [show, setShow] = useState(false);
  const [school, setSchool] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
  });
  const handleClose = () => {
    setShow(false);
    console.log('e.target.value', school);
    setSchool('');
  }
  const handleShow = () => setShow(true);

  const nameChange = (e) => {
    setSchool(e.target.value);
  }
  
    return (
      <div className="Homepage">
      <h1>Welcome in BlockChain IMS</h1>
      <Button variant="primary" onClick={handleShow}>
        Create School
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create School</Modal.Title>
        </Modal.Header>
        <Modal.Body><input onChange={nameChange} /></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }

Homepage.propTypes = {
  Homepage: PropTypes.func,
  isError: PropTypes.bool
};
export default Homepage;
