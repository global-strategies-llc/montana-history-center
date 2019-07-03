import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Hero from '../components/Hero'
import { v4 } from 'uuid'

import './contact.scss'

export const ContactPageTemplate = ({ title, heading, image, content, contentComponent }) => {

	const PageContent = contentComponent || Content,
				contactContent = [];

	content
		.split(/(<h2>.*?<\/h2>)/)
		.filter( item => !!item )
		.reduce( (prev, curr) => {
			if(prev && /^<h2>/.test(prev)) {
				contactContent.push(
					<PageContent key={v4()} className="content" content={`${prev}${curr}`} />
				)
			}
			return curr;
		})

	return (
		<div className="contact-us has-bg-base">
			<Hero image={image} title={title} heading={heading} />
			<section className="section">
				<div className="container">
					<div className="columns">
						<div className="column is-4">
							{ contactContent.slice(0, 2).map( (contact) => contact )}
						</div>
						<div className="column is-4">
							{ contactContent.slice(2, 4).map( (contact) => contact )}
						</div>
						<div className="column is-4">
							{ contactContent.slice(4).map( (contact) => contact )}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

ContactPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	heading: PropTypes.string.isRequired,
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	content: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	contentComponent: PropTypes.func,
}

const ContactPage = ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<Layout
			title={post.frontmatter.title}
			description={post.frontmatter.description}
			keywords={post.frontmatter.keywords}
		>
			<ContactPageTemplate
				contentComponent={HTMLContent}
				title={post.frontmatter.title}
				heading={post.frontmatter.heading}
				image={post.frontmatter.image}
				content={post.html}
			/>
		</Layout>
	)
}

ContactPage.propTypes = {
	data: PropTypes.object.isRequired,
}

export default ContactPage

export const contactPageQuery = graphql`
	query ContactPage($id: String!) {
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
			}
		}
	}
`
