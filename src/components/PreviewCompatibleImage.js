import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo }) => {
	const { alt = '', childImageSharp, image, style } = imageInfo

	if (!!image && !!image.childImageSharp) {
		return image.childImageSharp.fixed ?
			<Img style={style} fixed={image.childImageSharp.fixed} alt={alt} />
			: <Img style={style} fluid={image.childImageSharp.fluid} alt={alt} />
	}

	if (!!childImageSharp) {
		return childImageSharp.fixed ?
			<Img style={style} fixed={childImageSharp.fixed} alt={alt} />
			: <Img style={style} fluid={childImageSharp.fluid} alt={alt} />
	}

	if (!!image && typeof image === 'string')
		return <img style={style} src={image} alt={alt} />

	return null
}

PreviewCompatibleImage.propTypes = {
	imageInfo: PropTypes.oneOfType([PropTypes.shape({
		alt: PropTypes.string,
		childImageSharp: PropTypes.object,
		image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		style: PropTypes.object,
	}), PropTypes.string]).isRequired,
}

export default PreviewCompatibleImage
