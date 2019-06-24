import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import Signup from '../components/Signup'

import '../components/index.scss'

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
	<div>
		<Hero image={image} title={title} heading={heading} cta={cta}/>
		<section className="section section--gradient">
			<div className="container">
				<div className="section">
					<div className="columns">
						<div className="column is-12">
							<div className="content">
								<Testimonials testimonials={testimonials} />
							</div>
						</div>
					</div>
				</div>
				<div className="section mainpitch">
					<div className="content">
						<div className="tile has-text-centered">
							<h2 className="title is-size-2">
								{mainpitch.title.split(/\n/)[0]}
								{mainpitch.title.split(/\n/)[1] &&
									<span className="pitch-closer">{mainpitch.title.split(/\n/)[1]}</span>
								}
							</h2>
						</div>
					</div>
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
							...GatsbyImageSharpFluid
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
						year
						description
					}
				}
			}
		}
	}
`
