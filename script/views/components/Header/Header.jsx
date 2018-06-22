import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import get from 'lodash/get';
import ProfilePlaceholder from 'assets/img/profile_placeholder.png';
import { isValidURL } from 'utils/utils';
import { logout, getProfile } from 'actions/access.actions';
import toggleLogin from 'actions/modals.actions';
import './header.scss';

class Header extends Component {
  static propTypes = {
    /* Router */
    location: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
    /* Redux */
    userObj: PropTypes.object,
    logoutUser: PropTypes.func,
    getProfile: PropTypes.func,
    toggleLogin: PropTypes.func,
  };

  static defaultProps = {
    userObj: {},
    logoutUser: () => null,
    toggleLogin: () => null,
    getProfile: () => null,
  };

  componentWillReceiveProps(nextProps) {
    if (get(nextProps.location, 'state.loadUser')) {
      this.props.getProfile();
      this.props.history.replace({ state: null });
    }
  }

  handleLoginClick = () => {
    this.props.toggleLogin(true);
  };

  onLogoutClick = () => {
    this.props.logoutUser();
  };

  render() {
    const { userObj } = this.props;
    let userInfoEle = null;
    let profileImg = null;
    let profileWidth = 0;
    let profileHeight = 0;
    if (get(userObj, 'isAuthenticated')) {
      if (get(userObj, 'loggedUserObj.imgUrl') && isValidURL(userObj.loggedUserObj.imgUrl)) {
        profileImg = userObj.loggedUserObj.imgUrl;
        profileWidth = userObj.loggedUserObj.imgWidth;
        profileHeight = userObj.loggedUserObj.imgHeight;
      } else {
        profileImg = ProfilePlaceholder;
      }
      let name = get(userObj, 'loggedUserObj.email');
      if (get(userObj, 'loggedUserObj.userName')) {
        name = userObj.loggedUserObj.userName;
      }

      let backgroundSize = 'auto 30px';
      if (profileWidth < profileHeight) {
        backgroundSize = '30px auto';
      }

      userInfoEle = (
        <div className="navbar-signed d-flex">
          <style
            dangerouslySetInnerHTML={{
              __html: [
                '.img-profile {',
                `  background-image: url(${profileImg});`,
                `  background-size: ${backgroundSize};`,
                '}',
              ].join('\n'),
            }}
          />
          <div className="img-profile mr-2 rounded-circle" />
          <div className="dropdown profile-label d-flex align-items-center">
            <a
              href="#"
              className="dropdown-toggle Header__dropdown"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {name}
            </a>
            <div className="dropdown-menu dropdown-menu-right pull-right">
              <li className="dropdown-menu__item text-center">
                <button className="btn w-100 rounded-0" onClick={this.onLogoutClick}>
                  Logout
                </button>
              </li>
            </div>
          </div>
        </div>
      );
    } else {
      userInfoEle = (
        <ul className="navbar-nav navbar-right">
          <li>
            <a onClick={this.handleLoginClick}>Sign&nbsp;in</a>
          </li>
        </ul>
      );
    }

    return (
      <div className="Header">
        <header role="navigation">
          {/*
            ************ NAVBAR MENU
          */}
          <nav className="navbar navbar-light navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Navbar
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-controls="bs-example-navbar-collapse-1"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              {/* Collect the nav links, forms, and other content for toggling */}
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-left h-100">
                  <li>
                    <NavLink className="Header__navLink pl-2 ml-2" to="/" exact>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="Header__navLink pl-2 ml-2" to="/about">
                      About
                    </NavLink>
                  </li>
                </ul>
              </div>
              {userInfoEle}
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userObj: state.access.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logout()),
  toggleLogin: newState => dispatch(toggleLogin(newState)),
  getProfile: () => dispatch(getProfile()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Header),
);
