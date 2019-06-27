import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Testimonial from '../components/Testimonial'
import Banner from '../components/Banner'

export const StoriesPageTemplate = ({
	image,
	title,
	heading,
	cta,
	callout,
	groups
}) => (
	<div className="has-bg-base">
		<Hero image={image} title={title} heading={heading} cta={cta}/>
		<Banner className="has-bg-neutral" text={callout.text} cta={callout.cta} />
		<div className="supporters section">
			<div className="container">
				<div className="">
				</div>
			</div>
		</div>
	</div>
)

StoriesPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	heading: PropTypes.string,
	cta: PropTypes.object,
	callout: PropTypes.object,
	groups: PropTypes.array
}

const StoriesPage = ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<Layout>
			<StoriesPageTemplate
				title={post.frontmatter.title}
				image={post.frontmatter.image}
				heading={post.frontmatter.heading}
				cta={post.frontmatter.cta}
				callout={post.frontmatter.callout}
				groups={post.frontmatter.groups}
			/>
		</Layout>
	)
}

StoriesPage.propTypes = {
	data: PropTypes.object.isRequired,
}

export default StoriesPage

export const storiesPageQuery = graphql`
	query StoriesPage {
		markdownRemark(frontmatter: { templateKey: { eq: "stories-page" } }) {
			html
			frontmatter {
				title
				heading
				cta {
					text
					url
				}
				callout {
					text
					cta {
						text
						url
					}
				}
				groups {
					group
					testimonials {
						author
						quote
					}
				}
				image {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`
