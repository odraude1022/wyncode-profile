import React, { Component } from 'react'
import axios from 'axios'
import User from './User'
import Search from './Search'

export default class Users extends Component {
  state = {
    query: '',
    cohort: '',
    users : []
  }

  componentDidMount() {
    this.fetchUsers('', '')
  }
  fetchUsers = (query, cohort) => {
    let url = '/users.json?'
    if(query) {
      url += `term=${query}&`
    }
    if(cohort) {
      url += `cohort=${cohort}`
    }
    let data = axios.get(url).then(res => {
      this.setState({query: query, cohort: cohort, users: res.data.users})
    })
  }

  handleQueryChange = e => {
    const {cohort} = this.state
    this.fetchUsers(event.target.value, cohort)
  }

  handleCohortChange = e => {
    const {query} = this.state

    //only allow numeric input
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      this.fetchUsers(query, event.target.value)
    }
  }

  render(){
    let {query, cohort, users} = this.state
    return(
      <div className="wrapper">
        <div className="users">
          <h1>Find Wyncode Graduates!</h1>
          <Search
            query={query}
            cohort={cohort}
            handleQueryChange={this.handleQueryChange}
            handleCohortChange={this.handleCohortChange}
          />
          <ul className="userList">
            {
              users.map(user => {
                return(
                <User  key={user.id} user={user}/>
                )
              })
            }
          </ul>
        </div>
      </div>

    )
  }
}
