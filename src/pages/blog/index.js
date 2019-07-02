import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Hero from '../../components/Hero'
import BlogRoll from '../../components/BlogRoll'

const BlogIndexPage = () =>
	<StaticQuery
		query={query}
		render={(data) => {
			const image = data.image;
			return (
				<Layout>
					<div className="blogs has-bg-base">
						<Hero image={image} title="Latest Blogs" heading="Latest Stories" />
						<section className="section">
							<div className="container">
								<div className="content">
									<BlogRoll />
								</div>
							</div>
						</section>
					</div>
				</Layout>
			)
	}}
/>

const query = graphql`
	query {
		image: file(relativePath: { eq: "site-sketch-hero.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 2048, quality: 100) {
					...GatsbyImageSharpFluid_tracedSVG
				}
			}
		}
	}
`

export default BlogIndexPage

