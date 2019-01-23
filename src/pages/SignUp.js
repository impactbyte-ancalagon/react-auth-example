import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class SignUp extends Component {
  state = {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    success: false
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { name, age, email, password, confirmPassword } = this.state

    if (password !== confirmPassword) {
      alert('Password do not match!')
    } else {
      const response = await Axios.post(
        'http://localhost:8000/api/auth/signup',
        {
          name,
          age,
          email,
          password
        }
      )

      if (response === 'Success') {
        this.setState({
          name: '',
          age: 0,
          email: '',
          password: '',
          confirmPassword: '',
          success: true
        })
      }
    }
  }

  render() {
    const { name, age, email, password, confirmPassword, success } = this.state

    if (success) {
      return <Redirect to={{ pathname: '/signin' }} />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={this.handleChange}
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={age}
          onChange={this.handleChange}
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}