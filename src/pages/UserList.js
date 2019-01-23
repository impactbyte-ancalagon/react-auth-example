import React, { Component } from 'react'
import Cookies from 'js-cookie'
import Axios from 'axios'

export default class UserList extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    const token = Cookies.get('token')

    const {
      data: { users }
    } = await Axios.get('http://localhost:8000/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })

    this.setState({ users })
  }

  render() {
    const { users } = this.state

    return (
      <ul>{users && users.map((user, i) => <li key={i}>{user.name}</li>)}</ul>
    )
  }
}
