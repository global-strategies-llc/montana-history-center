import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Faq from '../components/Faq'

import './faq.scss'

export const FaqPageTemplate = ({
	image,
	title,
	heading,
	questions
}) => (
	<div className="has-bg-base">
		<Hero image={image} title={title} heading={heading}/>
		<div className="questions section">
			<div className="container">
				<div className="">
					{questions.map( (item, i) =>
						<Faq
							key={i}
							className=""
							question={item.question}
							answer={item.answer} />
					)}
				</div>
			</div>
		</div>
	</div>
)

FaqPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	heading: PropTypes.string,
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	questions: PropTypes.array,
}

const FaqPage = ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<Layout title={frontmatter.title} description={frontmatter.description} keywords={frontmatter.keywords} >
			<FaqPageTemplate
				title={post.frontmatter.title}
				image={post.frontmatter.image}
				heading={post.frontmatter.heading}
				questions={post.frontmatter.questions}
			/>
		</Layout>
	)
}

FaqPage.propTypes = {
	data: PropTypes.object.isRequired,
}

export default FaqPage

export const faqPageQuery = graphql`
	query FaqPage {
		markdownRemark(frontmatter: { templateKey: { eq: "faq-page" } }) {
			html
			frontmatter {
				title
				heading
				description
				keywords
				questions {
					question
					answer
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
