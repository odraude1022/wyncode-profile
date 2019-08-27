import React from 'react'

const User = props => {
  const {user, current_user} = props
  return(
    <div class="wrapper">
      <div class="user-info">
        <h1>{user.first_name} {user.last_name}</h1>
        <h2>C{user.cohort}</h2>
        <p>Email: {user.email}</p>
        {user.id === current_user.id &&
          <a href={`/users/${user.id}/edit`}>Edit Profile</a>
        }
      </div>
    </div>
  )
}

export default User
