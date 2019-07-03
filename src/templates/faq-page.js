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
	main,
}) => (
	<div className="faqs has-bg-base">
		<Hero image={image} title={title} heading={heading}/>
		<div className="questions section">
			<div className="container">
				<h2 className="faq-heading is-size-2">{main.heading}</h2>
				<div className="">
					{main.questions.map( (item, i) =>
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
	main: PropTypes.shape({
		heading: PropTypes.string,
		questions: PropTypes.arrayOf(
			PropTypes.shape({
				question: PropTypes.string,
				answer: PropTypes.string
			})
		),
	}),
}

const FaqPage = ({ data }) => {
	const { markdownRemark: post } = data

	return (
		<Layout title={post.frontmatter.title} description={post.frontmatter.description} keywords={post.frontmatter.keywords} >
			<FaqPageTemplate
				title={post.frontmatter.title}
				image={post.frontmatter.image}
				heading={post.frontmatter.heading}
				main={post.frontmatter.main}
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
				main {
					heading
					questions {
						question
						answer
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
