import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Testimonial from '../components/Testimonial'
import Banner from '../components/Banner'
import Timeline from '../components/Timeline'
import Signup from '../components/Signup'

export const MallSiteTemplate = ({
	image,
	title,
	heading,
	midway,
	closer,
	cta,
	testimonials,
	mainpitch
}) => (
	<div className="has-bg-base">
		<Hero image={image} title={title} heading={heading} cta={cta}/>
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
		<section className="mainpitch section">
			<div className="container">
				<h2 className="title is-size-2 has-text-centered">
					{mainpitch.title.split(/\n/)[0]}
					{mainpitch.title.split(/\n/)[1] &&
						<span className="pitch-closer">{mainpitch.title.split(/\n/)[1]}</span>
					}
				</h2>
				<Timeline entries={mainpitch.timeline} />
			</div>
			<div className="section">
				<h3 className="has-text-centered is-size-4">
					{midway}
				</h3>
			</div>
			<div className="section">
				<h3 className="has-text-centered is-size-3">
					{closer}
				</h3>
			</div>
		</section>
		<Signup action="#" />
	</div>
)

MallSiteTemplate.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	heading: PropTypes.string,
	cta: PropTypes.object,
	testimonials: PropTypes.array,
	mainpitch: PropTypes.object,
	midway: PropTypes.string,
	closer: PropTypes.string
}

const MallSite = ({ data }) => {
	const { frontmatter } = data.markdownRemark
	return (
		<Layout>
			<MallSiteTemplate
				image={frontmatter.image}
				title={frontmatter.title}
				heading={frontmatter.heading}
				midway={frontmatter.midway}
				closer={frontmatter.closer}
				cta={frontmatter.cta}
				testimonials={frontmatter.testimonials}
				mainpitch={frontmatter.mainpitch}
			/>
		</Layout>
	)
}

MallSite.propTypes = {
	data: PropTypes.shape({
		markdownRemark: PropTypes.shape({
			frontmatter: PropTypes.object,
		}),
	}),
}

export default MallSite

export const pageQuery = graphql`
	query MallSiteTemplate {
		markdownRemark(frontmatter: { templateKey: { eq: "mallsite-page" } }) {
			frontmatter {
				title
				heading
				midway
				closer
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
					timeline {
						date
						description
					}
				}
			}
		}
	}
`
