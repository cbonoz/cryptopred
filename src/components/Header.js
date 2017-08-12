/**
 * Created by cbuonocore on 7/12/17.
 */
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import logo from './../static/cryptoalarms_logo.png'
import {logout} from './../helpers/auth'
import firebase from 'firebase';
import MenuIcon from './../static/hamburger_icon.png';
import {WEB_WIDTH} from './../config/constants';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            windowWidth: window.innerWidth,
            mobileNavVisible: false
        };
    }

    handleResize() {
        this.setState({windowWidth: window.innerWidth});
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    navigationLinks() {
        return (<ul className="nav navbar-nav">
            <li>
                <NavLink activeClassName="selected" to="/about" className="navbar-brand">About</NavLink>
            </li>
            <li>
                <NavLink activeClassName="selected" to="/leaderboards" className="navbar-brand">Leaderboards</NavLink>
            </li>
        </ul>);
    }

    renderMobileNav() {
        if (this.state.mobileNavVisible) {
            return this.navigationLinks();
        }
    }

    handleNavClick() {
        if (!this.state.mobileNavVisible) {
            this.setState({mobileNavVisible: true});
        } else {
            this.setState({mobileNavVisible: false});
        }
    }

    renderNavigation() {

        const user = firebase.auth().currentUser;
        if (this.state.windowWidth <= WEB_WIDTH) {
            return (
                <span className="mobile_nav">
                    <p onClick={this.handleNavClick.bind(this)}
                       className="header-menu-row">
                        <img src={MenuIcon} alt="Menu Dropdown" className="menu-icon"/>
                    </p>
                    {this.renderMobileNav()}
                    {user !== null && <span className="email-header-text">
                        {user.email}
                            </span>}
                </span>
            );
        } else {
            return (
                <span>
                    {this.navigationLinks()}
                    {user !== null && <span className="email-header-text">
                                    {user.email}
                            </span>}
                </span>);
        }
    }

    render() {
        return (
            <div className="header-content">
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <NavLink activeClassName="selected" to="/" className="navbar-brand">
                                <img src={logo} alt="Header"/>
                            </NavLink>
                            {this.renderNavigation()}

                        </div>

                    </div>
                </nav>
            </div>
        );
    }
}

Header.propTypes = {};
Header.defaultProps = {};

export default Header;

