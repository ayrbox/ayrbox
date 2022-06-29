import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Hi All</h1>
    <p>Welcome to beans Ayrbox</p>
    <p>
      I am a full stack developer and I am starting my blog to document my
      finding that that might be helpful to other.
    </p>
    <p>
      All positive suggestions and criticism are welcome so that I can improve.
    </p>
    <Link to="/aboutme/">More about me</Link>
  </div>
)

export default IndexPage
