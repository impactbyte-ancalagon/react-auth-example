import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import UserList from './pages/UserList'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

class App extends Component {
  state = {
    isAuthenticated: false
  }

  updateAuthStatus = value => {
    this.setState({ isAuthenticated: value })
  }

  render() {
    const { isAuthenticated } = this.state

    return (
      <Fragment>
        <Route path="/" exact component={Home} />
        <Route
          path="/users"
          render={props =>
            isAuthenticated ? (
              <UserList {...props} signOut={() => this.updateAuthStatus(false)} />
            ) : (
              <Redirect
                to={{ pathname: '/signin', state: { from: props.location } }}
              />
            )
          }
        />
        <Route
          path="/signup"
          render={props =>
            !isAuthenticated ? (
              <SignUp {...props} />
            ) : (
              <Redirect to={{ pathname: '/users' }} />
            )
          }
        />
        <Route
          path="/signin"
          render={props =>
            !isAuthenticated ? (
              <SignIn {...props} signIn={() => this.updateAuthStatus(true)} />
            ) : (
              <Redirect to={{ pathname: '/users' }} />
            )
          }
        />
      </Fragment>
    )
  }
}

export default App
