import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AsyncAboutView } from 'asyncViews';
import { getProfile } from 'actions/access.actions';
import get from 'lodash/get';
import ProfilePlaceholder from 'assets/img/profile_placeholder.png';
import { isValidURL } from 'utils/utils';
import './homeView.scss';

class HomeView extends Component {
  static propTypes = {
    userObj: PropTypes.object,
    getProfile: PropTypes.func,
  };

  static defaultProps = {
    userObj: {},
    getProfile: () => null,
  };

  state = {
    showProfile: false,
  };

  componentDidMount() {
    AsyncAboutView.preload();
  }

  getProfile = () => {
    this.setState({ showProfile: true }, () => {
      this.props.getProfile();
    });
  };

  render() {
    const { userObj } = this.props;
    const { showProfile } = this.state;
    let profileImg = null;
    let profileWidth = 0;
    let profileHeight = 0;
    let backgroundSize = null;
    if (get(userObj, 'isAuthenticated')) {
      if (get(userObj, 'loggedUserObj.imgUrl') && isValidURL(userObj.loggedUserObj.imgUrl)) {
        profileImg = userObj.loggedUserObj.imgUrl;
        profileWidth = userObj.loggedUserObj.imgWidth;
        profileHeight = userObj.loggedUserObj.imgHeight;
      } else {
        profileImg = ProfilePlaceholder;
      }
      backgroundSize = 'auto 60px';
      if (profileWidth < profileHeight) {
        backgroundSize = '60px auto';
      }
    }
    return (
      <div className="HomeView m-3">
        <h1>HOME PAGE</h1>
        {get(userObj, 'isAuthenticated') && (
          <button type="button" className="btn btn-outline-dark mt-3" onClick={this.getProfile}>
            Get Profile
          </button>
        )}
        {get(userObj, 'isAuthenticated') &&
          showProfile && (
            <div className="d-flex mt-3">
              <style
                dangerouslySetInnerHTML={{
                  __html: [
                    '.ProfileImg {',
                    `  background-image: url(${profileImg});`,
                    `  background-size: ${backgroundSize};`,
                    '}',
                  ].join('\n'),
                }}
              />
              <div className="ProfileImg mr-2 rounded-circle" />
              <div className="UserInfo d-flex flex-column justify-content-center ml-2">
                {get(userObj, 'loggedUserObj.userName') && (
                  <div className="UserName">
                    <span>UserName: </span>
                    <strong>{userObj.loggedUserObj.userName}</strong>
                  </div>
                )}
                {get(userObj, 'loggedUserObj.email') && (
                  <div className="Email">
                    <span>Email: </span>
                    <strong>{userObj.loggedUserObj.email}</strong>
                  </div>
                )}
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userObj: state.access.user,
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);
