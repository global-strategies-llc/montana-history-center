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
			<div className="pitch-image column is-three-fifths">
				<Img fluid={
					mainpitch.image.childImageSharp ?
						mainpitch.image.childImageSharp.fluid
						: mainpitch.image
				} />
			</div>
			<div className="pitches column is-two-fifths">
				<div className="pitch pitch-why">
					<Img fluid={
						mainpitch.why.image.childImageSharp ?
							mainpitch.why.image.childImageSharp.fluid
							: mainpitch.why.image
					} />
					<h4 className="subtitle">{mainpitch.why.heading}</h4>
					<ul>
						{
							mainpitch.why.points.map( (point, i) =>
								<li key={i}>{point}</li>
							)
						}
					</ul>
				</div>
				<div className="pitch pitch-whynot">
					<Img fluid={
						mainpitch.whynot.image.childImageSharp ?
							mainpitch.whynot.image.childImageSharp.fluid
							: mainpitch.whynot.image
					} />
					<h4 className="subtitle">{mainpitch.whynot.heading}</h4>
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
			<div>
				<h3 className="has-text-centered is-size-4">
					{supporters.heading}
				</h3>
				<Features cols={3} gridItems={supporters.clients} />
			</div>
		</section>
		<section className="section featured-links">
			<div>
				<h3 className="has-text-centered is-size-3">
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
		<Layout>
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
						heading
						points
					}
					whynot {
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
