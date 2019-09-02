import React from 'react';
import PropTypes from 'prop-types'


function InstituteHomePage(props){
  return(
    <div>
      Welcome in BlockChain IMS 
    </div>
  )
}

InstituteHomePage.propTypes = {
  handleShow: PropTypes.func,
  showDropDown: PropTypes.bool,
};
export default InstituteHomePage;