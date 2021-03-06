import React from 'react';
import PropTypes from 'prop-types'
import { Route ,withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import AppComp from './components/App';
import AdminHomepage from './components/AdminHomepage';
import InstituteHomePage from './components/InstituteHomePage';
import Header from './components/Header'


  class App extends React.Component {

    componentDidMount() {
      //access drizzle props within componentDidMount
      const { drizzle, drizzleState } = this.props;
      console.log('drizzle', drizzle);
      console.log('drizzleState', drizzleState);
   }
    render(){
      console.log('this.props', this.props);
    return(
      <div>
        <Header history={this.props.history}/>
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
}
App.propTypes = {
  history: PropTypes.object,
}
export default withRouter(App);