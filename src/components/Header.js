import React from 'react';
import PropTypes from 'prop-types'
import { Dropdown} from "react-bootstrap";


function Header(props){
  return(
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <span
      className="navbar-brand col-sm-3 col-md-2 mr-0"
    >
      BlockChain IMS 
    </span>
    {props.showDropDown &&
    <span className='pr-3 p-1'>
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        Welcome
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>props.handleShow(1)}>Create Account</Dropdown.Item>
        <Dropdown.Item  onClick={()=>props.handleShow(2)}>Super Admin</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </span>
    }

    </nav>
  )
}

Header.propTypes = {
  handleShow: PropTypes.func,
  showDropDown: PropTypes.bool,
};
export default Header;