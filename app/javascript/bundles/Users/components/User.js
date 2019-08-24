import React, { Component } from 'react'

const User = props => {
  let {user} = props
  return(
    <li className="user">
      <a href={user.location}>{user.first_name} {user.last_name}</a>
      <p>C{user.cohort}</p>
    </li>
  )
}

export default User
