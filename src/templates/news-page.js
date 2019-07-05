import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import PressQuote from '../components/PressQuote'
import Banner from '../components/Banner'
import BlogRoll from '../components/BlogRoll'

let maxQuoteLength = null;
const getMaxQuoteLength = (arr) => {
	return maxQuoteLength ||
		arr.reduce( (max, curr) => curr.quote.length > max ? curr.quote.length : max, 0 )
}

export const NewsPageTemplate = ({
	image,
	title,
	heading,
	cta,
	callout,
	main
}) => (
	<div className="news has-bg-base">
		<Hero image={image} title={title} heading={heading} cta={cta}/>
		<Banner className="has-bg-neutral" text={callout.text} cta={callout.cta} />
		<section className="press section">
			{ main.image &&
				<div className="news-image has-text-centered">
					<Img fixed={main.image.childImageSharp.fixed} />
				</div>
			}
			<h2 className="is-size-1 has-text-centered">{main.heading}</h2>
			<div className="container">
				<div className="columns is-multiline">
					{
						main.press.map( (press, i) => {
							const cols = Math.ceil(press.quote.length / getMaxQuoteLength(main.press) * 12)
							return <PressQuote key={i} { ...press } className={`column is-${cols}`} />
						})
					}
				</div>
			</div>
		</section>
  	<BlogRoll count={3} className="has-bg-white"/>
	</div>
)

NewsPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	heading: PropTypes.string,
	cta: PropTypes.object,
	callout: PropTypes.object,
	main: PropTypes.shape({
    heading: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    press: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
				title: PropTypes.string,
				url: PropTypes.string,
				date: PropTypes.string,
				author: PropTypes.string,
				quote: PropTypes.string
			})
    )
  }),
}

const NewsPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark

	return (
		<Layout
			title={frontmatter.title}
			description={frontmatter.description}
			keywords={frontmatter.keywords}
			hasSignup={true}
		>
			<NewsPageTemplate
				title={frontmatter.title}
				image={frontmatter.image}
				heading={frontmatter.heading}
				cta={frontmatter.cta}
				callout={frontmatter.callout}
				main={frontmatter.main}
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
				description
				keywords
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
				main {
					heading
					image {
						childImageSharp {
							fixed(width: 100, height: 100) {
								...GatsbyImageSharpFixed
							}
						}
					}
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
