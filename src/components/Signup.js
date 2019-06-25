import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import SignupForm from './SignupForm'

import './Signup.scss'

const Signup = (action) =>
	<StaticQuery
		query={query}
		render={(data) => {
			const image = data.image;
			return (
				<section className="signup full-width-image"
					style={{
						backgroundImage: `url(${
							image.childImageSharp ?
								image.childImageSharp.fluid.src
								: image
						})`,
						backgroundAttachment: 'initial'
					}}
				>
					<div>
						<div className="column is-5 is-marginless">
							<SignupForm action={action} />
						</div>
					</div>
				</section>
			)
		}}
	/>

const query = graphql`
	query {
		image: file(relativePath: { eq: "jumbotron.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 2048, quality: 100) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`
export default Signup