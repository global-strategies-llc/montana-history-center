import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import './Hero.scss'

const Heading = ({ text, eyebrow, level }) => {
	const HeadingTag = `h${level || 1}`;
	return (
		<HeadingTag
			text={text}
			className={
				`is-size-${level}`
			}>
			{ eyebrow &&
				<strong className="eyebrow">{eyebrow}</strong>
			}
			{ text.split(/\n/)[0] }
			{ text.split(/\n/)[1] &&
				<span className="is-subheading">{text.split(/\n/).slice(1).join(' ')}</span>
			}
		</HeadingTag>
	)
}

const toTitleCase = (str) => (
	str
		.split(' ')
		.map( s => [s[0].toUpperCase(), s.slice(1).toLowerCase()].join('') )
		.join(' ')
)

const Hero = ({
	image,
	eyebrow,
	heading,
	subheading,
	cta
}) => {
	return (
		<div className="page-hero full-width-image margin-top-0">
			<div className="hero-image">
				{ image ?
					image.childImageSharp ?
					 	<Img fluid={image.childImageSharp.fluid} />
						: <img src={image} />
					: null
				}
			</div>
			<div className="section">
				<div className="container">
					<div className="columns is-desktop">
						<div className="heading-wrap column is-three-fifths-desktop">
							{ heading &&
								<Heading text={heading} eyebrow={eyebrow} level={1} />
							}
							{ cta &&
								<div className="hero-cta">
									<Link className="button button-invert" to={`/${cta.url}`}>
										{cta.text}
									</Link>
								</div>
							}
						</div>
						{ subheading &&
							<div className="subheading-wrap column is-two-fifths-desktop">
								<div className="subheading-inner">
									{
										'object' === typeof subheading ?
											Object.keys(subheading).map( (key, i) => (
												<React.Fragment key={i}>
													<small className="eyebrow">{toTitleCase(key)}:</small>
													<Heading text={subheading[key]} level={Math.min(2 + (i * 2), 6)} />
												</React.Fragment>
											))
											: <Heading text={subheading} level={4} />
									}
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

Hero.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	eyebrow: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	cta: PropTypes.object
}

Heading.propTypes = {
	text: PropTypes.string,
	eyebrow: PropTypes.string,
	level: PropTypes.number
}

export default Hero
