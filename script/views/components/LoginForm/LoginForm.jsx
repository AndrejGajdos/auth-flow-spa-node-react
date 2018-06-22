import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import get from 'lodash/get';
import includes from 'lodash/includes';
import { login } from 'actions/access.actions';
import toggleLogin from 'actions/modals.actions';
import cn from 'classnames';

import ReactModal from 'react-modal';
import { Tooltip } from 'react-tippy';

import './loginForm.scss';

class LoginForm extends Component {
  static propTypes = {
    loginUser: PropTypes.func,
    toggleLogin: PropTypes.func,
    openLogin: PropTypes.bool.isRequired,
    userObj: PropTypes.object,
    error: PropTypes.any,
  };

  static defaultProps = {
    error: null,
    userObj: {},
    loginUser: () => null,
    toggleLogin: () => null,
  };

  state = {
    error: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userObj && nextProps.userObj.isAuthenticated) {
      this.closeModal();
    }

    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  handleInputChange = (e) => {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  closeModal = () => {
    this.props.toggleLogin(false);
  };

  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.loginUser(this.email.value, this.password.value);
  };

  handleFocusInput = (e) => {
    const label = document.querySelector(`[for=${e.target.id}]`);
    if (!label.classList.contains('active')) {
      label.classList.add('active');
    }
    this.resetError();
  };

  handleBlurInput = (e) => {
    if (!e.target.value) {
      document.querySelector(`[for=${e.target.id}]`).classList.remove('active');
    }
  };

  onClickModalWindow = () => {
    this.resetError();
  };

  resetError = () => {
    if (this.errorElement && this.errorElement.length > 0) {
      this.setState({ error: null });
    }
  };

  onFacebookLogin = () => {
    const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set('lastLocation_before_logging', this.props.location.pathname, { expires: inOneHour });
    window.location.href = `${window.location.origin}/auth/facebook`;
  };

  render() {
    const { openLogin } = this.props;
    const { error } = this.state;
    const customModalStyle = {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
      },
    };

    const errorMessage = error ? error.message : '';

    return (
      <ReactModal
        isOpen={openLogin}
        contentLabel="Modal"
        ariaHideApp={false}
        closeTimeoutMS={500}
        onRequestClose={this.closeModal}
        style={customModalStyle}
        className={{
          base: 'loginForm',
          afterOpen: 'loginForm_after-open',
          beforeClose: 'loginForm_before-close',
        }}
      >
        <div onClick={this.onClickModalWindow}>
          <h5 className="loginForm__heading mx-auto mb-2 text-center">Sign in</h5>
          <div className="loginForm__formContainer d-flex flex-column px-3 py-4">
            <button
              type="button"
              className="btn facebook-login-container mx-auto mt-2 rounded"
              onClick={this.onFacebookLogin}
            >
              Continue with Facebook
            </button>
            <div className="form-divider mt-3">
              <span className="d-flex flex-row">
                <strong className="loginForm__dividerLabel">or</strong>
              </span>
            </div>
            <form className="loginForm__form d-flex flex-column mx-auto mb-2" onSubmit={this.handleSubmitForm}>
              <span className="loginForm__formHeader my-3 text-center">Sign in with your email</span>
              <div className="form-group">
                <div
                  className={cn('form-group', 'mb-4', {
                    'has-error': includes(get(error, 'type'), 'email'),
                  })}
                >
                  <Tooltip
                    html={<span>{errorMessage}</span>}
                    open={includes(get(error, 'type'), 'email')}
                    onRequestClose={() => this.setState({ error: null })}
                  >
                    <input
                      type="email"
                      className="form-control floatLabel"
                      id="registerInputEmail"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleFocusInput}
                      onBlur={this.handleBlurInput}
                      autoComplete="email"
                      ref={el => (this.email = el)}
                    />
                    <label htmlFor="registerInputEmail">Email</label>
                  </Tooltip>
                </div>
                <div className={cn('form-group', { 'has-error': includes(get(error, 'type'), 'password') })}>
                  <Tooltip
                    html={<span>{errorMessage}</span>}
                    open={includes(get(error, 'type'), 'password')}
                    onRequestClose={() => this.setState({ error: null })}
                  >
                    <input
                      type="password"
                      className="form-control floatLabel mt-2"
                      id="registerInputPassword"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleFocusInput}
                      onBlur={this.handleBlurInput}
                      autoComplete="current-password"
                      ref={el => (this.password = el)}
                    />
                    <label htmlFor="registerInputPassword">Password</label>
                  </Tooltip>
                </div>
              </div>
              <button type="submit" className="btn loginForm__signIn">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </ReactModal>
    );
  }
}

const mapStateToProps = state => ({
  userObj: state.access.user,
  error: state.access.error,
  openLogin: state.toggleModal.login,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(login(email, password)),
  toggleLogin: newState => dispatch(toggleLogin(newState)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginForm),
);
