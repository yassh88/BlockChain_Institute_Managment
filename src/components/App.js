import React, { Component } from 'react';
import Login from './Login';

import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Institute from '../abis/Institute.json'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      candidates: [],
      hasVoted: false,
      loading: true,
      isError: false,
      loginRequestSent: false,
    }

    if (typeof web3 != 'undefined') {
      // eslint-disable-next-line no-undef
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    // eslint-disable-next-line no-undef
    web3.currentProvider.enable()
    this.web3 = new Web3(this.web3Provider)

    this.institute = TruffleContract(Institute)
    this.institute.setProvider(this.web3Provider)

    this.login = this.login.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }
  
  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account })
      this.institute.deployed().then((instituteInstance) => {
        this.instituteInstance = instituteInstance
        this.watchEvents()
        console.log('instituteInstance', this.instituteInstance);
      })
    })
  }
 
  watchEvents() {
    console.log('instituteInstance', this.instituteInstance);
    this.instituteInstance.LoginResponse({
      fromBlock: 0,
      toBlock: 'latest'
    }, (error,result) => {
      if(result&& result.args.isLoggedIn){
        this.setState({ isError: false })
      }
      else if(result&& !result.args.isLoggedIn){
        this.setState({ isError: true })
      }
    })
  }

  login(username, password) {
    this.setState({ loginRequestSent: true  });
    this.instituteInstance.login(username, password, { from: this.state.account });
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
              <Login login={this.login} isError={this.state.isError}/>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
