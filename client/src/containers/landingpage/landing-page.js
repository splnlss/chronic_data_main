import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import '../dashboard/dashboard.css';
import LoginForm from '../../auth/components/login-form';


export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    let styles = {
      
    };

    return (
      <main>
        <div className="home ui message">
            <h2>Welcome to Chronic Data</h2>
            <LoginForm />
            <Link to="/register" style={styles}>Register</Link>
        </div>
      </main>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
