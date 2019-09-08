import React from 'react';
import PropTypes from 'prop-types'
import { Dropdown} from "react-bootstrap";
import { DRAWDOWN_TYPE} from './constants'

function Header(props){

  const Logout =()=>{
    localStorage.clear();
    props.history.push('/');
  }
  return(
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <span
      className="navbar-brand col-sm-3 col-md-2 mr-0"
    >
      BlockChain IMS 
    </span>
    <span className='pr-3 p-1'>
    {props.showDropDown ? 
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        Welcome
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>props.handleShow(DRAWDOWN_TYPE.CreateInstitute)}>Create Account</Dropdown.Item>
        <Dropdown.Item  onClick={()=>props.handleShow(DRAWDOWN_TYPE.InstituteLogin)}>Institute Login</Dropdown.Item>
        <Dropdown.Item  onClick={()=>props.handleShow(DRAWDOWN_TYPE.SuperAdminLogin)}>Admin Login</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
     : 
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        Profile
      </Dropdown.Toggle>
      <Dropdown.Menu>
      <Dropdown.Item onClick={()=>Logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    } 
</span>
    </nav>
  )
}

Header.propTypes = {
  handleShow: PropTypes.func,
  showDropDown: PropTypes.bool,
  history: PropTypes.object,
};
export default Header;