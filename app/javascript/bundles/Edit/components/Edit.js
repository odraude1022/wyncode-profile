import React from 'react'
import axios from 'axios'


const csrfHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN':     ReactOnRails.authenticityToken()
}

class Edit extends React.Component {

  state = {
            user: {
                  first_name: this.props.user.first_name,
                  last_name: this.props.user.last_name,
                  email: this.props.user.email,
                  cohort: this.props.user.cohort,
                  errors: []
                }
          }

  handleSubmit = event => {
    let {user} = this.state
    event.preventDefault()
    axios.patch(`/users/${this.props.user.id}.json`, {user}, { headers: csrfHeaders })
      .then(response => {
        let location = response.data.location
        window.location = location
      })
      .catch(error => {
        console.log(error)
        user.errors = error.response.data.errors
        this.setState(user)
      })
  }

  handleFirstNameChange = event => {
    let {user} = this.state
    user.first_name = event.target.value
    this.setState({user})
  }

  handleLastNameChange = event => {
    let {user} = this.state
    user.last_name = event.target.value
    this.setState({user})
  }

  handleEmailChange = event => {
    let {user} = this.state
    user.email = event.target.value
    this.setState({user})
  }

  handleCohortChange = event => {
    let {user} = this.state
    //only allow numeric input
    const re = /^[0-9\b]+$/

    if (event.target.value === '' || re.test(event.target.value)) {
      user.cohort = event.target.value
      this.setState({user})
    }
  }

  handlePasswordChange = event => {
    let {user} = this.state
    user.password = event.target.value
    this.setState({user})
  }

  handlePasswordConfirmationChange = event => {
    let {user} = this.state
    user.password_confirmation = event.target.value
    this.setState({user})
  }

  render() {
    return(
      <>
        <h1>Edit Profile</h1>
        <form action="/users" method="patch" onSubmit={this.handleSubmit}>

          <label htmlFor="user_first_name">First name</label>
          <input
            type="text"
            name="user[first_name]"
            value={this.state.user.first_name}
            onChange={this.handleFirstNameChange}
          />

          <label htmlFor="user_last_name">Last name</label>
          <input
            type="text"
            name="user[last_name]"
            value={this.state.user.last_name}
            onChange={this.handleLastNameChange}
          />

          <label htmlFor="user_email">Email</label>
          <input
            type="email"
            name="user[email]"
            value={this.state.user.email}
            onChange={this.handleEmailChange}
          />

          <label htmlFor="user_cohort">Cohort</label>
          <input
            type="text"
            name="user[cohort]"
            value={this.state.user.cohort}
            onChange={this.handleCohortChange}
          />

          <div className="invalid-feedback">
          { this.state.user.errors.join(', ') }
          </div>

          <input type="submit" value="Save Changes"/>

        </form>
      </>
    )
  }
}

export default Edit
