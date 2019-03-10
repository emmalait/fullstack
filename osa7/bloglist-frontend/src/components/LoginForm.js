import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <h2>login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id='username'
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type={password.type}
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <Button variant="primary" type="submit">log in</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default LoginForm
