import React, { Component, Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Axios from 'axios'

import Home from './pages/Home'
import UserList from './pages/UserList'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

class App extends Component {
  state = {
    isAuthenticated: false
  }

  async componentDidMount() {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`
      )
      if (response.status !== 500) {
        console.log(true)
      }
    } catch (err) {}
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
              <UserList
                {...props}
                signOut={() => this.updateAuthStatus(false)}
              />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route
          path="/signup"
          render={props =>
            !isAuthenticated ? <SignUp {...props} /> : <Redirect to="/users" />
          }
        />
        <Route
          path="/signin"
          render={props =>
            !isAuthenticated ? (
              <SignIn {...props} signIn={() => this.updateAuthStatus(true)} />
            ) : (
              <Redirect to="/users" />
            )
          }
        />
      </Fragment>
    )
  }
}

export default App
