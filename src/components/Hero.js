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
				{ heading &&
					<h1 className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
						{ eyebrow &&
							<strong className="eyebrow">{eyebrow}</strong>
						}
						{heading}
					</h1>
				}
				{ subheading &&
					<h3 className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
						{ subheading.split(/\n/)[0] }
						{ subheading.split(/\n/)[1] &&
							<span className="sub2">{subheading.split(/\n/).slice(1).join(' ')}</span>
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
	eyebrow: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.string,
	cta: PropTypes.object
}

export default Hero
