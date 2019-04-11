import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Switch, withRouter} from 'react-router-dom';
import HeaderBar from './components/common/header/header';
import LandingPage from './containers/landingpage/landing-page';
import Dashboard from './containers/dashboard/dashboard';
import DocumentsForm from './components/documents/components/document-form';
import Vitals from './components/vitals/vitals';
import DocumentList from './components/documentViewer/components/documentList';
import DocumentViewer from './components/documentViewer/components/documentViewer';
import Contact from "./containers/contact/contact";
import RegistrationPage from './auth/components/registration-page';
import {refreshAuthToken} from './auth/actions/auth';

export class App extends React.Component {
    render() {
        return (
            <div className="app">
                <HeaderBar />
                <Switch>
                  <Route exact path="/" component={LandingPage}/>
                  <Route exact path="/Dashboard" component={Dashboard} />
                  <Route path="/Dashboard/SubmitDocument" component={DocumentsForm}/>
                  <Route path="/Dashboard/Vitals" component={Vitals}/>
                  <Route path="/Dashboard/Documents" component={DocumentList}/>
                  <Route path="/Dashboard/Contact" component={Contact}/>
                  <Route path="/register" component={RegistrationPage} />
                  <Route path="/documents/:id" component={DocumentViewer} />
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
