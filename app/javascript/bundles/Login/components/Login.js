import React from 'react'
import axios from 'axios'


const csrfHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN':     ReactOnRails.authenticityToken()
}

class Login extends React.Component {
  state = {
            session: {
              email: '',
              password: '',
              remember_me: '0',
              error: ''
            }

          }

  handleEmailChange = event => {
    let {session} = this.state
    session.email = event.target.value
    this.setState({session})
  }

  handlePasswordChange = event => {
    let {session} = this.state
    session.password = event.target.value
    this.setState({session})
  }

  handleRememberChange = event => {
    let {session} = this.state
    session.remember_me = event.target.checked === false ? '0' : '1'
    this.setState({session})
  }

  handleSubmit = event => {
    let {session} = this.state
    event.preventDefault()
    axios.post('/login.json', {session}, { headers: csrfHeaders })
      .then(response => {
        let location = response.data.user.location
        window.location = location
      })
      .catch(error => {
        session.error = "Invalid email/password"
        session.email = ''
        session.password = ''
        this.setState(session)
      })
  }

  render() {
    return(
      <>
        <h1>Log in</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="session_email">Email</label>
          <input
            type="email"
            name="session[email]"
            value={this.state.session.email}
            onChange={this.handleEmailChange}
          />

          <label htmlFor="session_password">Password</label>
          <input
            type="password"
            name="session[password]"
            value={this.state.session.password}
            onChange={this.handlePasswordChange}
          />

          <label htmlFor="session_remember_me">
            <input type="checkbox" checked={this.state.session.remember_me === '0' ? false : true} name="session[remember_me]" onChange={this.handleRememberChange}/>
            <span>Remember me on this computer</span>
          </label>

          <input type="submit" value="Log in"/>

          <div className="invalid-feedback">
          { this.state.session.error }
          </div>

        </form>
        <p>New user? <a href="/users/new">Sign up now!</a></p>
      </>
    )
  }
}

export default Login
