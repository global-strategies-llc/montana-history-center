import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Testimonial from '../components/Testimonial'
import Features from '../components/Features'
import Signup from '../components/Signup'

import './index.scss'

export const IndexPageTemplate = ({
	image,
	title,
	eyebrow,
	heading,
	subheading,
	cta,
	testimonials,
	mainpitch,
	supporters,
	featuredLinks
}) => (
	<div className="has-bg-base">
		<Hero image={image} title={title} eyebrow={eyebrow} heading={heading} subheading={subheading} cta={cta}/>
		<div className="testimonials section">
			<div className="container">
				<div className="columns">
					{testimonials.map( (item, i) =>
						<Testimonial
							key={i}
							className="column is-6"
							quote={item.quote}
							author={item.author} />
					)}
				</div>
			</div>
		</div>
		<section className="mainpitch full-width-heading has-pre-line has-bg-neutral">
			<div className="container">
				<div className="content">
					<div className="tile has-text-centered">
						<h2 className="title is-size-1">
							{mainpitch.title}
						</h2>
					</div>
				</div>
			</div>
		</section>
		<section className="columns mainpitch">
			<div className="pitch-image column is-three-fifths"
				style={{
					backgroundImage: `url(
						${
							mainpitch.image.childImageSharp ?
								mainpitch.image.childImageSharp.fluid.src
								: mainpitch.image
						})`
				}} >
			</div>
			<div className="pitches column is-two-fifths">
				<div className="pitch pitch-why">
					<div className="pitch-heading">
						{ mainpitch.why.image &&
							<div className="pitch-icon">
								<Img fixed={
									mainpitch.why.image.childImageSharp ?
										mainpitch.why.image.childImageSharp.fixed
										: mainpitch.why.image
								} />
							</div>
						}
						<h4 className="is-size-2">{mainpitch.why.heading}</h4>
					</div>
					<ul>
						{
							mainpitch.why.points.map( (point, i) =>
								<li key={i}>{point}</li>
							)
						}
					</ul>
				</div>
				<div className="pitch pitch-whynot">
					<div className="pitch-heading">
						{ mainpitch.whynot.image &&
							<div className="pitch-icon">
								<Img fixed={
									mainpitch.whynot.image.childImageSharp ?
										mainpitch.whynot.image.childImageSharp.fixed
										: mainpitch.whynot.image
								} />
							</div>
						}
						<h4 className="is-size-2">{mainpitch.whynot.heading}</h4>
					</div>
					<ul>
						{
							mainpitch.whynot.points.map( (point, i) =>
								<li key={i}>{point}</li>
							)
						}
					</ul>
				</div>
			</div>
		</section>
		<section className="section supporters">
			<div className="container">
				<h3 className="has-text-centered is-size-3">
					{supporters.heading}
				</h3>
				<Features cols={3} gridItems={supporters.clients} />
			</div>
		</section>
		<hr />
		<section className="section featured-links">
			<div className="container">
				<h3 className="has-text-centered is-size-2">
					{featuredLinks.heading}
				</h3>
				<Features cols={4} gridItems={featuredLinks.links} />
			</div>
		</section>
		<Signup action="#" />
	</div>
)

IndexPageTemplate.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	eyebrow: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.object,
	cta: PropTypes.object,
	testimonials: PropTypes.array,
	mainpitch: PropTypes.object,
	supporters: PropTypes.object,
	featuredLinks: PropTypes.object
}

const IndexPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark
	return (
		<Layout title={frontmatter.title} description={frontmatter.description} keywords={frontmatter.keywords}>
			<IndexPageTemplate
				image={frontmatter.image}
				title={frontmatter.title}
				eyebrow={frontmatter.eyebrow}
				heading={frontmatter.heading}
				subheading={frontmatter.subheading}
				cta={frontmatter.cta}
				testimonials={frontmatter.testimonials}
				mainpitch={frontmatter.mainpitch}
				supporters={frontmatter.supporters}
				featuredLinks={frontmatter.featuredLinks}
			/>
		</Layout>
	)
}

IndexPage.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object,
		}),
	}),
}

export default IndexPage

export const pageQuery = graphql`
	query IndexPageTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
			frontmatter {
				title
				eyebrow
				heading
				subheading {
					question
					answer
				}
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
				testimonials {
					author
					quote
				}
				mainpitch {
					title
					image {
						childImageSharp {
							fluid(maxWidth: 900, quality: 100) {
								...GatsbyImageSharpFluid
							}
						}
					}
					why {
						image {
							childImageSharp {
								fixed(width: 64, height: 64) {
									...GatsbyImageSharpFixed
								}
							}
						}
						heading
						points
					}
					whynot {
						image {
							childImageSharp {
								fixed(width: 64, height: 64) {
									...GatsbyImageSharpFixed
								}
							}
						}
						heading
						points
					}
				}
				supporters {
					heading
					clients {
						image {
							childImageSharp {
								fluid(maxWidth: 240, quality: 64) {
									...GatsbyImageSharpFluid_tracedSVG
								}
							}
						}
						text
					}
				}
				featuredLinks {
					heading
					links {
						image {
							childImageSharp {
								fluid(maxWidth: 240, quality: 64) {
									...GatsbyImageSharpFluid_tracedSVG
								}
							}
						}
						link {
							text
							url
						}
					}
				}
			}
		}
	}
`
