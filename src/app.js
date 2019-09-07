import React from 'react';
import { Route ,withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import AppComp from './components/App';
import AdminHomepage from './components/AdminHomepage';
import InstituteHomePage from './components/InstituteHomePage';
import Header from './components/Header'


function App(){
  return(
    <div>
      <Header/>
      <div className="container-fluid">
          <div className="row">
            <main role="main" className="d-flex text-center">
              <div className="content mr-auto ml-auto">
                <Route exact path="/" component={AppComp} />
                <Route path="/Home" component={AdminHomepage} />
                <Route path="/InstituteHome" component={InstituteHomePage} />
              </div>
            </main>
          </div>
      </div>
    </div>
  )
}

export default withRouter(App);