import React from 'react';
import PropTypes from 'prop-types'


function InstituteHomePage(props){
  return(
    <div className="mt-5">
      Welcome in BlockChain IMS 
    </div>
  )
}

InstituteHomePage.propTypes = {
  handleShow: PropTypes.func,
  showDropDown: PropTypes.bool,
};
export default InstituteHomePage;