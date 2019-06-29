import React from 'react'
import PropTypes from 'prop-types'

import PreviewCompatibleImage from './PreviewCompatibleImage.js'

import './PressQuote.scss'

const PressQuote = ({ title, name, image, date, url, quote, author, className }) => (
	<article className={ [className, 'press-item'].join(' ') }>
		<a target="_blank"
			href={url} title={`${name} - ${title}`}
			rel="noopener"
		>
			<div className="press-heading">
					{ image ?
						<PreviewCompatibleImage
							imageInfo={{
								image: image,
								childImageSharp: image.childImageSharp,
								alt: name,
								style: { maxWidth: 280 }
							}}
						/>
						: <h4>{name}</h4>
					}
			</div>
			<div className="press-content">
				{quote}
			</div>
			<div className="press-cite">
				<h5>{title}</h5>
				<span className="press-author">
					{
						[date, `by ${author}`].join(' - ')
					}
				</span>
			</div>
		</a>
	</article>
)

PressQuote.propTypes = {
	quote: PropTypes.string,
	author: PropTypes.string,
	className: PropTypes.string
}

export default PressQuote
