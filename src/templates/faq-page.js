import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Faq from '../components/Faq'

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
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	heading: PropTypes.string,
	questions: PropTypes.array,
}

const FaqPage = ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<Layout>
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
