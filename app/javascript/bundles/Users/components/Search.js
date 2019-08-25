import React from 'react'

const Search = props => {
  return(
    <div className="search-params">
      <input
          autoComplete="off"
          type="text"
          placeholder="Search"
          value={props.query}
          onChange={props.handleQueryChange}
      />
      <input
          autoComplete="off"
          type="text"
          placeholder="Filter by Cohort"
          value={props.cohort}
          onChange={props.handleCohortChange}
      />
    </div>
  )
}

export default Search
