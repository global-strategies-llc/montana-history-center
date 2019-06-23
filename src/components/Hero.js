import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './Hero.scss'

const Hero = ({
	image,
	title,
	eyebrow,
	heading,
	subheading,
	cta
}) => {
	return (
		<div className="page-hero full-width-image margin-top-0"
			style={
				{ backgroundImage: `url(${
					image.childImageSharp ?
						image.childImageSharp.fluid.src
						: image
				})`}
			}
		>
			<div className="heading-wrap">
				{ title &&
					<h1 className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
						{ eyebrow &&
							<strong className="eyebrow">{eyebrow}</strong>
						}
						{title}
					</h1>
				}
				{ heading &&
					<h3 className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
						{heading}
						{ subheading &&
							<small>{subheading}</small>
						}
					</h3>
				}
				{ cta &&
					<div className="hero-cta">
						<Link className="btn" to={cta.url}>
							{cta.text}
						</Link>
					</div>
				}
			</div>
		</div>
	)
}

Hero.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.string,
	cta: PropTypes.object
}

export default Hero
