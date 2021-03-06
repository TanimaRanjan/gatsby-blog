import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Title = styled.h1`
  display: inline-block;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  &:hover {
    color: #1dcaff;
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const BlogBody = styled.div`
  margin-bottom: 50px;
`

const IndexPage = ({ data }) => {
  

  return (
  <Layout>

    <SEO title="Home" />
    <div>
      <h1>All my recipes</h1>
      <h4>{data.allMarkdownRemark.totalCount} Posts </h4>
      { 
        data.allMarkdownRemark.edges.map(({node}) => (

            <BlogBody key={node.id} >
            <BlogLink to={node.fields.slug}>
            <BlogTitle>
            <span>{node.frontmatter.title} - {node.frontmatter.date }</span>
            </BlogTitle>
            </BlogLink>
            <p>{node.excerpt}</p>
            </BlogBody>
        ))
      }
      </div>
  
  </Layout>
)

}
export default IndexPage

export const query = graphql`
query {
  allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date})  {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
        fields {
          slug
        }
        html
        excerpt
      }
    }
  }
}
`