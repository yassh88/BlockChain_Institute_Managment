import React, { Component } from 'react';
import Login from './Login';
import Homepage from './Homepage';

import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import SuperAdmin from '../abis/SuperAdmin.json'
import './App.css';
import web3Data from'./SharingData'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
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

    this.institute = TruffleContract(SuperAdmin)
    this.institute.setProvider(web3Data.web3Provider)

    this.login = this.login.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }
  
  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.institute.deployed().then((superAdminInstance) => {
        this.superAdminInstance = superAdminInstance
        this.watchEvents()
      })
    })
  }
 
  watchEvents() {
    this.superAdminInstance.LoginResponse({
      fromBlock: 0,
      toBlock: 'latest'
    }, (error,result) => {
      if(result&& result.args.isLoggedIn){
        this.setState({ loginStatus: true , isError: false})
      }
      else if(result&& !result.args.isLoggedIn){
        console.log(result.args.isLoggedIn, result);
        this.setState({ isError: true })
      }
    })
  }

  login(username, password) {
    this.setState({ loginRequestSent: true  });
    this.superAdminInstance.login(username, password, { from: this.state.account });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <span
            className="navbar-brand col-sm-3 col-md-2 mr-0"
          >
            BlockChain IMS 
          </span>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              {this.state.loginStatus ? 
               <Homepage web3={this.web3} account={ this.state.account}/> : 
              <Login login={this.login} isError={this.state.isError}/>
              }
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
