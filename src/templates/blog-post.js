import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Content, { HTMLContent } from '../components/Content'

import Facebook from '../img/social/facebook.svg'
import Twitter from '../img/social/twitter.svg'

import './blog-post.scss'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  slug,
  date,
  author,
  featuredimage,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  const shareViaPlatform = (e) => {

    const shareurl = window.location.href;

    e.preventDefault()

    switch(e.target.closest('[title]').title) {

      case 'facebook':
        return window.open('https://www.facebook.com/sharer/sharer.php?href='+shareurl, 'fb-share', 'height=300,width=400')

      case 'twitter':
        return window.open('https://twitter.com/share?url='+shareurl+'&via=MontanaHistoryCenter.org', 'twitter-share', 'height=550,width=420')

    }

  }

  return (
    <div className="blog-post has-bg-base">
      <Hero image={featuredimage} title={title} heading={title} subheading={description}/>
      <section className="section">
        {helmet || ''}
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1 blog-post-body">
              <div className="blog-meta">
                <p>
                  <span className="blog-date">{date}</span>
                  { author &&
                    <React.Fragment><br/><span className="blog-author">By {author}</span></React.Fragment>
                  }
                </p>
                <div className="social">
                  <a title="facebook" onClick={shareViaPlatform} >
                    <Facebook />
                  </a>
                  <a title="twitter" onClick={shareViaPlatform} >
                    <Twitter />
                  </a>
                </div>
              </div>
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
        slug={post.fields.slug}
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
      fields {
        slug
      }
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
