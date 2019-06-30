import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { v4 } from 'uuid'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Testimonial from '../components/Testimonial'
import Banner from '../components/Banner'

import './stories.scss'

export const StoriesPageTemplate = ({
	image,
	title,
	heading,
	cta,
	callout,
	groups
}) => (
	<div className="stories has-bg-base">
		<Hero image={image} title={title} heading={heading} cta={cta}/>
		<Banner className="has-bg-neutral" text={callout.text} cta={callout.cta} />
		{
			groups.map( (group, i) =>
				<div key={v4()} className="testimonials section">
					<div className="container">
						<div className="testimonials-heading">
							{ group.image &&
								<div className="testimonial-image">
									<Img fluid={group.image.childImageSharp.fluid} />
								</div>
							}
							<h3 className="is-size-2 has-text-centered">{group.name}</h3>
						</div>
						<div className="columns">
							{
								group.testimonials.map( (testimonial, i) =>
									<Testimonial key={i} author={testimonial.author} quote={testimonial.quote} />
								)}
						</div>
					</div>
				</div>
			)}
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
	const { frontmatter } = data.markdownRemark
	return (
		<Layout>
			<StoriesPageTemplate
				title={frontmatter.title}
				image={frontmatter.image}
				heading={frontmatter.heading}
				cta={frontmatter.cta}
				callout={frontmatter.callout}
				groups={frontmatter.groups}
			/>
		</Layout>
	)
}

StoriesPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object,
		}),
	}),
}

export default StoriesPage

export const storiesPageQuery = graphql`
	query StoriesPageTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "stories-page" } }) {
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
					name
					icon {
						childImageSharp {
							fluid(maxWidth: 100, quality: 100) {
								...GatsbyImageSharpFluid
							}
						}
					}
					testimonials {
						author
						quote
					}
				}
				image {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid_tracedSVG
						}
					}
				}
			}
		}
	}
`
