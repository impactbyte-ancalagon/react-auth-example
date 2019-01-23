import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

export default class SignIn extends Component {
  state = {
    email: '',
    password: '',
    success: false
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { email, password } = this.state

    const { data } = await Axios.post('http://localhost:8000/api/auth/signin', {
      email,
      password
    })

    if (data.token) {
      this.setState({ email: '', password: '', success: true })
      this.props.updateAuthStatus(true)
      Cookies.set('token', data.token, { expires: 7 })
    }
  }

  render() {
    const { email, password, success } = this.state

    if (success) {
      return <Redirect to={{ pathname: '/users' }} />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
