import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import SignupForm from './SignupForm'

import './Signup.scss'

const Signup = ({ action }) =>
	<StaticQuery
		query={query}
		render={(data) => {
			const image = data.image;
			return (
				<section id="petition" className="signup full-width-image"
					style={{
						backgroundImage: `url(${
							image.childImageSharp ?
								image.childImageSharp.fluid.src
								: image
						})`,
						backgroundAttachment: 'initial'
					}}
				>
					<div className="container">
						<div className="column-wrap">
							<div className="column is-4 is-offset-1">
								<SignupForm action={action} />
							</div>
						</div>
					</div>
				</section>
			)
		}}
	/>

const query = graphql`
	query {
		image: file(relativePath: { eq: "mhc-petition-signup-wide.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 2048, quality: 100) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`
export default Signup
