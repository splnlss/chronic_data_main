import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Switch, withRouter} from 'react-router-dom';
import HeaderBar from './header';
import LandingPage from './landing-page';
import Dashboard from './dashboard';
import AddDocument from './addDocument';
import AddVitals from './addVitals';
import FileManagement from './fileManagement';
import Contact from "./contact";
import RegistrationPage from '../auth/components/registration-page';
import {refreshAuthToken} from '../auth/actions/auth';

export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <HeaderBar />
                <Switch>
                  <Route exact path="/" component={LandingPage}/>
                  <Route exact path="/Dashboard" component={Dashboard} />
                  <Route path="/Dashboard/AddDocument" component={AddDocument}/>
                  <Route path="/Dashboard/AddVitals" component={AddVitals}/>
                  <Route path="/Dashboard/FileManagement" component={FileManagement}/>
                  <Route path="/Dashboard/Contact" component={Contact}/>
                  <Route path="/register" component={RegistrationPage} />
                  {/* <SecureRoute path="/profile" component={ProfilePage} /> */}
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authToken: state.auth.authToken,
    currentUser: state.auth.currentUser
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
