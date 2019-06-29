import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import PressQuote from '../components/PressQuote'

export const NewsPageTemplate = ({
	image,
	title,
	heading,
	cta,
	main
}) => (
	<div className="news has-bg-base">
		<Hero image={image} title={title} heading={heading} cta={cta}/>
		<h2 className="is-size-2 has-text-centered">{main.heading}</h2>
		<div className="press section">
			<div className="container">
				<div className="columns">
					{
						main.press.map( (press, i) =>
							<PressQuote key={i} { ...press } className="column" />
						)}
				</div>
			</div>
		</div>
	</div>
)

NewsPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	heading: PropTypes.string,
	cta: PropTypes.object,
	main: PropTypes.object
}

const NewsPage = ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<Layout>
			<NewsPageTemplate
				title={post.frontmatter.title}
				image={post.frontmatter.image}
				heading={post.frontmatter.heading}
				cta={post.frontmatter.cta}
				main={post.frontmatter.main}
			/>
		</Layout>
	)
}

NewsPage.propTypes = {
	data: PropTypes.object.isRequired,
}

export default NewsPage

export const newsPageQuery = graphql`
	query NewsPage {
		markdownRemark(frontmatter: { templateKey: { eq: "news-page" } }) {
			html
			frontmatter {
				title
				heading
				cta {
					text
					url
				}
				main {
					heading
					press {
						name
						image {
							childImageSharp {
								fluid(maxWidth: 280, quality: 80) {
									...GatsbyImageSharpFluid
								}
							}
						}
						title
						url
						date
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
