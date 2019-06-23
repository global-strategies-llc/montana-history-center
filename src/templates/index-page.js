import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
	image,
	title,
	eyebrow,
	heading,
	subheading,
	mainpitch,
	description,
	intro,
}) => (
	<div>
		<Hero image={image} title={title} eyebrow={eyebrow} heading={heading} subheading={subheading} cta={mainpitch.cta}/>
		<section className="section section--gradient">
			<div className="container">
				<div className="section">
					<div className="columns">
						<div className="column is-10 is-offset-1">
							<div className="content">
								<div className="content">
									<div className="tile">
										<h1 className="title">{mainpitch.title}</h1>
									</div>
									<div className="tile">
										<h3 className="subtitle">{mainpitch.description}</h3>
									</div>
								</div>
								<div className="columns">
									<div className="column is-12 has-text-centered">
										<Link className="btn" to={mainpitch.cta.url}>
											{mainpitch.cta.text}
										</Link>
									</div>
								</div>
								<div className="columns">
									<div className="column is-12">
										<h2 className="has-text-weight-semibold is-size-2">
											{heading}
										</h2>
										{
											description.split(/\n/).map( (p, i) =>
												p.length ?
													<p key={i}>{p}</p>
													: null)
										}
									</div>
								</div>
								<div className="columns">
									<div className="column is-12">
										{
											intro.blurbs.map( (content, i) =>
												<blockquote key={i}>
													{content.text}
													<cite>
														{content.cite.split(/\n/)[0]}
														{content.cite.split(/\n/)[1] &&
															<span>{content.cite.split(/\n/)[1]}</span>
														}
													</cite>
												</blockquote>
											)
										}
									</div>
								</div>
								<div className="column is-12">
									<h3 className="has-text-weight-semibold is-size-2">
										Latest stories
									</h3>
									<BlogRoll />
									<div className="column is-12 has-text-centered">
										<Link className="btn" to="/blog">
											Read more
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
)

IndexPageTemplate.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	eyebrow: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.string,
	mainpitch: PropTypes.object,
	description: PropTypes.string,
	intro: PropTypes.shape({
		blurbs: PropTypes.array,
	}),
}

const IndexPage = ({ data }) => {
	const { frontmatter } = data.markdownRemark
	return (
		<Layout>
			<IndexPageTemplate
				image={frontmatter.image || {}}
				title={frontmatter.title}
				eyebrow={frontmatter.eyebrow}
				heading={frontmatter.heading}
				subheading={frontmatter.subheading}
				mainpitch={frontmatter.mainpitch}
				description={frontmatter.description}
				intro={frontmatter.intro}
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
				subheading
				image {
					childImageSharp {
						fluid(maxWidth: 2048, quality: 100) {
							...GatsbyImageSharpFluid
						}
					}
				}
				mainpitch {
					title
					description
					cta {
						text
						url
					}
				}
				description
				intro {
					blurbs {
						text
						cite
						image {
							childImageSharp {
								fluid(maxWidth: 240, quality: 64) {
									...GatsbyImageSharpFluid
								}
							}
						}
					}
					heading
					description
				}
			}
		}
	}
`
