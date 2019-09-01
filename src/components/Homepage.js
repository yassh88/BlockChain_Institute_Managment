import React,  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Table, thead, tr, th, td, tbody } from "react-bootstrap";

import TruffleContract from 'truffle-contract'
import Institute from '../abis/Institute.json'
import web3Data from'./SharingData'

function Homepage(props){
  const [show, setShow] = useState(false);
  const [instituteName, setInstitute] = useState(false);
  const [UserName, setUserName] = useState(false);
  const [Password, setPassword] = useState(false);
  const [instituteList, setInstituteList] = useState([]);
  const [instituteInstance, setInstituteInstance] = useState();
  const institute = TruffleContract(Institute)
  institute.setProvider(web3Data.web3Provider)

  useEffect(() => {
  },[instituteList]);

  useEffect(() => {
    props.web3.eth.getCoinbase((err, account) => {
      institute.deployed().then((instituteObj) => {
        setInstituteInstance(instituteObj);
        const InstitutesArray = [];
        instituteObj.getInstitutesAccounts({from:props.account}).then(async (instAccounts)=>{
          for (var i = 1; i <= instAccounts.length; i++) {
            await instituteObj.getInstitutes(instAccounts[0], {from:props.account}).then((instObj) => {
              InstitutesArray.push({
                id: instObj[0].toNumber(),
                name: instObj[1],
                studentCount: instObj[2].toNumber(),
              });
            });
          }
          setInstituteList(InstitutesArray);
        });
      })
    })
  },[]);


  const handleClose = (isSubmitted) => {
    setShow(false);
    setInstitute('');
    if(isSubmitted && instituteInstance){
      instituteInstance.addInstitute(instituteName, UserName, Password,{ from: props.account });
    }
  }
  const handleShow = () => setShow(true);

  const nameChange = (e) => {
    setInstitute(e.target.value);
  }
  const userNameChange = (e) => {
    setUserName(e.target.value);
  }
  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  const InstituteListComp =[];
  for (var i = 0; i < instituteList.length; i++) {
    InstituteListComp.push(<tr key={'key'+i}>
      <td>{instituteList[i].id}</td>
      <td>{instituteList[i].name}</td>
      <td>{instituteList[i].studentCount}</td>
      <td>{instituteList[i].username}</td>
      <td>{instituteList[i].password}</td>
    </tr>)
   };

    return (
      <div className="Homepage">
      <h1>Welcome in BlockChain IMS</h1>
      
      <Table striped bordered hover> 
 <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Count</th>
      <th>UserName</th>
      <th>Password</th>
    </tr>
  </thead>
    <tbody>
      {InstituteListComp}
    </tbody>
  </Table>
  <Button variant="primary" onClick={handleShow}>
        Create Institute
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Institute</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{padding: '20px' }}><span style={{padding: '39px' }}>Name: </span><input placeholder="name" onChange={nameChange} /></div>
        <div style={{padding: '20px' }}><span style={{padding: '39px' }}>UserName: </span><input placeholder="user name" onChange={userNameChange} /></div>
        <div style={{padding: '20px' }}><span style={{padding: '39px' }}>Password: </span><input placeholder="password" onChange={passwordChange} /></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose(true)}>
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
  isError: PropTypes.bool,
  web3: PropTypes.object,
  account: PropTypes.string,
};
export default Homepage;
