import React,  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Institute from '../abis/Institute.json'
import web3Data from'./SharingData'

function CreateInstitute(props){
  const [instituteName, setInstitute] = useState(false);
  const [instituteInstance, setInstituteInstance] = useState();
  const institute = TruffleContract(Institute)
  institute.setProvider(web3Data.web3Provider)


  useEffect(() => {
    props.web3.eth.getCoinbase((err, account) => {
      institute.deployed().then((instituteObj) => {
        setInstituteInstance(instituteObj);
      })
    })
  },[]);

  const watchEvents  = async (instituteObj)=> {
    instituteObj.instituteCreatedEvent({
      fromBlock: 0,
      toBlock: 'latest'
    }, async (error,result) => {
      if(result&& result.args.id){
        const InstitutesArray = [];
        console.log('result.args.id', result.args.id);
         for (var i = 1; i <= result.args.id.toNumber(); i++) {
          await instituteObj.Institutes(i).then((instObj) => {
            InstitutesArray.push({
              id: instObj[0].toNumber(),
              name: instObj[1],
              studentCount: instObj[2].toNumber(),
            });
          });
        }
      }
      else if(result&& !result.args.id){
      }
    })
  }

  const handleClose = (event) => {
    event.preventDefault();
    const price = window.web3.toWei('1', 'Ether')
    instituteInstance.addInstitute(instituteName ,{ from: props.account,value: window.web3.toWei('1', 'Ether') });
  }

  const nameChange = (e) => {
    setInstitute(e.target.value);
  }

    return (
      <div>
       <form onSubmit={handleClose}  >
        <FormGroup controlId="Name" >
          <label>Name</label>
          <FormControl
            autoFocus
            type="input"
            value={instituteName===false ? ' ' :instituteName}
            onChange={nameChange}
          />
        </FormGroup>
        <Button
          block
          disabled={instituteName===false ? true :false}
          type="submit"
        >
          Create
        </Button>
      </form>
      </div>
    );
  }

CreateInstitute.propTypes = {
  CreateInstitute: PropTypes.func,
  isError: PropTypes.bool,
  web3: PropTypes.object,
  account: PropTypes.string,
};
export default CreateInstitute;
