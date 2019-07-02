import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Content, { HTMLContent } from '../components/Content'

import './blog-post.scss'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  date,
  author,
  featuredimage,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <div className="blog-post has-bg-base">
      <Hero image={featuredimage} title={title} heading={title} subheading={description}/>
      <p className="blog-description"></p>
      <section className="section">
        {helmet || ''}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1 blog-post-body">
              <p className="blog-meta">
                <span className="blog-date">{date}</span>
                { author &&
                  <React.Fragment><br/><span className="blog-author">By {author}</span></React.Fragment>
                }
              </p>
              <PostContent content={content} />
              {tags && tags.length ? (
                <div style={{ marginTop: `4rem` }}>
                  <h4>Tags</h4>
                  <ul className="taglist">
                    {tags.map(tag => (
                      <li key={tag + `tag`}>
                        <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        featuredimage={post.frontmatter.featuredimage}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        author={post.frontmatter.author}
        date={post.frontmatter.date}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        description
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
        tags
      }
    }
  }
`
