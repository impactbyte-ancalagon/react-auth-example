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

    const response = await Axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/signin`,
      this.state
    )

    if (response.status === 200) {
      Cookies.set('token', response.data.token, { expires: 7 })
      this.setState({ email: '', password: '', success: true })
      this.props.signIn()
    }
  }

  render() {
    const { email, password, success } = this.state

    if (success) {
      return <Redirect to="/users" />
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
