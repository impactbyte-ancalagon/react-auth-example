import React, { Component, Fragment } from 'react'
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
    } = await Axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    this.setState({ users })
  }

  handleClick = e => {
    Cookies.remove('token')
    this.props.signOut()
  }

  render() {
    const { users } = this.state

    return (
      <Fragment>
        <ul>{users && users.map((user, i) => <li key={i}>{user.name}</li>)}</ul>
        <button onClick={this.handleClick}>Sign Out</button>
      </Fragment>
    )
  }
}
