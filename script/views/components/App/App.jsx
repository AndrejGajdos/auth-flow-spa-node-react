import React, { Component } from 'react';

import Header from 'components/Header';
import Routes from 'routes';
import LoginFormModal from 'components/LoginForm';

import './App.scss';

export class App extends Component {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { error, errorInfo } = this.state;
    return (
      <div>
        <Header />
        <main>
          {!error && <Routes />}
          {error && (
            <div className="App__error container mt-3">
              <div role="alert" className="alert alert-danger">
                <h4>An error occurred. Please reload the page and try again.</h4>
                <p className="App__stacktrace">
                  {process.env.NODE_ENV === 'development' && errorInfo.componentStack}
                </p>
              </div>
            </div>
          )}
        </main>
        <LoginFormModal />
      </div>
    );
  }
}

export default App;
