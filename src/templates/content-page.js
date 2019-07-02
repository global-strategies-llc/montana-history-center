import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Hero from '../components/Hero'

export const ContentPageTemplate = ({ title, heading, image, cta, content, contentComponent }) => {
	const PageContent = contentComponent || Content

	return (
		<div className="has-bg-base">
			<Hero image={image} title={title} heading={heading} cta={cta}/>
			<section className="section">
				<div className="container">
					<div className="columns">
						<div className="column is-10 is-offset-1">
							<div className="section">
								<PageContent className="content" content={content} />
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

ContentPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	contentComponent: PropTypes.func,
}

const ContentPage = ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<Layout title={post.frontmatter.title} description={post.frontmatter.description} keywords={post.frontmatter.keywords} >
			<ContentPageTemplate
				contentComponent={HTMLContent}
				title={post.frontmatter.title}
				heading={post.frontmatter.heading}
				image={post.frontmatter.image}
				content={post.html}
			/>
		</Layout>
	)
}

ContentPage.propTypes = {
	data: PropTypes.object.isRequired,
}

export default ContentPage

export const contentPageQuery = graphql`
	query ContentPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			html
			frontmatter {
				title
				heading
				description
				keywords
				image {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid_tracedSVG
						}
					}
				}
				cta {
					text
					url
				}
			}
		}
	}
`
