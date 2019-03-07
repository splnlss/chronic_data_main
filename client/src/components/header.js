import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import './dashboard.css'
import './header.css'
import logo from '../images/logo.svg';
import {connect} from 'react-redux';
import {clearAuth} from '../auth/actions/auth';
import {clearAuthToken} from '../local-storage';

export class Header extends React.Component {
  logOut() {
      this.props.dispatch(clearAuth());
      clearAuthToken();
  }

  render(){
    let headerMenu;

    if (this.props.loggedIn){
        headerMenu =(
          <div>
            <li><Link to="/Dashboard/AddDocument">+ Add Document</Link></li>
            <li><Link to="/Dashboard/AddVitals">+ Add Vitals</Link></li>
            <li><Link to="/Dashboard/FileManagement">+ File Management</Link></li>
            <li><Link to="/Dashboard/Contact">+ Contact</Link></li>
            <li><a href="#" onClick={() => this.logOut()}>+ Log out</a></li>
          </div>
        );
    }

    // if (!this.props.loggedIn){
    //     headerMenu =(
    //           <li><a href="#" onClick={() => this.logOut()}>+ Log In</a></li>
    //       )
    //     }

  return (
      <div>
        <header className="header">
          <img src={logo} className="logo" alt="Chronic Data Logo" height="120"/>
          <div className="title">
            <h1 className="header-title"><Link to="/">CHRONIC DATA SOCIETY</Link></h1>
            <p className="header-intro">
                your data. your control.
            </p>
          </div>
  			<nav>
  				<ul className="header-links">
  				  {headerMenu}
          </ul>
  			</nav>
  		</header>
    </div>
    )
  }
}

const mapStateToProps = state => ({
      loggedIn: state.auth.currentUser !== null
  });

export default connect(mapStateToProps)(Header);
