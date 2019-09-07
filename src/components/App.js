import React, { Component } from 'react';
import Login from './Login';
import CreateInstitute from './CreateInstitute';
import PropTypes from 'prop-types';
import { Modal, Button, Carousel } from "react-bootstrap";
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import SuperAdmin from '../abis/SuperAdmin.json'
import './App.css';
import web3Data from'./SharingData'
import Header from './Header'
import { connect } from "react-redux";
import {addUser} from './Redux/actions';
import Institute from '../abis/Institute.json'
import img1 from '../Images/img1.jpg'
import img2 from '../Images/img2.jpg'
import img3 from '../Images/img3.jpg'
import img4 from '../Images/img4.jpg'

import {USER_TYPE, DRAWDOWN_TYPE} from './constants'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      show: false,
      loading: true,
      isError: false,
      loginStatus: false,
      loginRequestSent: false,
    }

    if (typeof web3 != 'undefined') {
      // eslint-disable-next-line no-undef
      web3Data.web3Provider = web3.currentProvider
    } else {
      web3Data.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    // eslint-disable-next-line no-undef
    web3.currentProvider.enable()
    this.web3 = new Web3(web3Data.web3Provider)

    this.superAdmin = TruffleContract(SuperAdmin)
    this.superAdmin.setProvider(web3Data.web3Provider)
    this.institute = TruffleContract(Institute)
    this.institute.setProvider(web3Data.web3Provider)
    this.watchEvents = this.watchEvents.bind(this)
    this.lastStatus = localStorage.getItem('loginStatus');
    this.lastAccount=  localStorage.getItem('account');
    this.userType = localStorage.getItem('userType');
  }
  
  componentDidMount() {
    // TODO: Refactor with promise chain
    let self =this;
     this.web3.eth.getCoinbase(async (err, account) => {
      self.setState({ account })
      await self.superAdmin.deployed().then(async (superAdminInstance) => {
        self.superAdminInstance = superAdminInstance
        await self.watchEvents();
        if(this.lastStatus && this.lastAccount === this.state.account && USER_TYPE.Admin === this.userType){
          this.props.history.push({
            pathname: '/Home',
            state: { account: this.state.account },
          });
          this.setState({ loginStatus: true , isError: false, show: false})
        }
      })
    })

    this.web3.eth.getCoinbase((err, account) => {
      self.institute.deployed().then((instituteObj) => {
        
        self.instituteInstance =instituteObj;
        if(this.lastStatus && this.lastAccount === account && USER_TYPE.Institute === this.userType){
          console.log("deployed ins")
          this.props.history.push('/InstituteHome');
        }
      })
    })
    
  }

  handleShow = (type) => {
    switch(type){
      case DRAWDOWN_TYPE.CreateInstitute: {
        this.setState({show: true, modalType: type});
        break;
      }
      case DRAWDOWN_TYPE.InstituteLogin: {
        this.instituteInstance.Institutes(this.state.account, { from: this.state.account }).then(instituteObj=>{
          if(instituteObj[0].toNumber()>0){
            console.log("instituteObj", instituteObj);
            localStorage.setItem('loginStatus', true);
            localStorage.setItem('account', this.state.account);
            localStorage.setItem('userType', USER_TYPE.Institute);
            this.props.history.push('/InstituteHome');
          } else {
            alert("You Account Is not Created")
          }
        });
        break;
      }
      case DRAWDOWN_TYPE.SuperAdminLogin: {
        this.userType = USER_TYPE.Admin;
        this.superAdminInstance.login({ from: this.state.account });
        break;
      }
    }
  }
  handleClose = (isSuccess) => {
    this.setState({show: false});
    if(isSuccess){
      localStorage.setItem('loginStatus', true);
      localStorage.setItem('account', this.state.account);
      localStorage.setItem('userType', USER_TYPE.Institute);
      this.props.history.push({
        pathname: '/InstituteHome',
        state: { account: this.state.account },
      });
    }
  } 

 
  watchEvents() {
    this.superAdminInstance.LoginResponse({
      fromBlock: 'latest',
      toBlock: 'latest'
    }, (error,result) => {
      if(result&& result.args.isLoggedIn){
        if(USER_TYPE.Admin === this.userType ){
          localStorage.setItem('loginStatus', true);
          localStorage.setItem('account', this.state.account);
          localStorage.setItem('userType', USER_TYPE.Admin);
          this.setState({ loginStatus: true , isError: false, show: false})
          this.props.history.push({
            pathname: '/Home',
            state: { account: this.state.account },
          });
        }
      }
      else if(result&& !result.args.isLoggedIn){
        console.log("fasl")
        localStorage.setItem('loginStatus', false);
        localStorage.setItem('account', '');
        this.userType = '';
        this.setState({ isError: true, loginStatus: false })
        alert("You are not Super Admin")
      }
    })
  }

  render() {
    this.props.addUser('yash');
    console.log('usersdfd', this.props.users)

    return (
      <div>
        <Header showDropDown handleShow={this.handleShow} />
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img2}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome</h3>
              <p>THis this the platform from where you can create your institute account on IMS .</p>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
              className="d-block w-100"
              src={img3}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome</h3>
              <p>THis this the platform from where you can create your institute account on IMS .</p>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
              className="d-block w-100"
              src={img4}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Welcome</h3>
              <p>THis this the platform from where you can create your institute account on IMS .</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Institute</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.state.modalType=== 2 ? <Login login={this.login} isError={this.state.isError}/>
        : <CreateInstitute web3={this.web3} account={ this.state.account} handleClose={this.handleClose} isError={this.state.isError}/>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
  addUser: PropTypes.func,
  users: PropTypes.object,
};

const mapStateToProps = state => ({
  users : state,
});

export default connect(mapStateToProps, {addUser} )(App);
