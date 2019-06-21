import React from 'react'
import PropTypes from 'prop-types'

import './Hero.scss'

const Hero = ({
	image,
	title,
	heading,
	subheading
}) => {
	return (
		<div className="page-hero full-width-image margin-top-0"
			style={{
				backgroundImage: `url(${
					!!image.childImageSharp ? image.childImageSharp.fluid.src : image
				})`,
			}}
		>
			<div className="heading-wrap">
				<h1 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
					{title}
				</h1>
				<h3 className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen">
					{subheading}
				</h3>
			</div>
		</div>
	)
}

Hero.propTypes = {
	image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	title: PropTypes.string,
	heading: PropTypes.string,
	subheading: PropTypes.string,
}

export default Hero
