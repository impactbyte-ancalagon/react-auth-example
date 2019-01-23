import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <Fragment>
    <h1>Welcome!</h1>
    <Link to="/signup">Sign Up</Link>
    <Link to="/signin">Sign In</Link>
  </Fragment>
)
