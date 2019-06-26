import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

import './Testimonial.scss'

const Testimonial = ({ quote, author, className }) => (
	<article key={v4()} className={ [className, 'message'].join(' ') }>
		<blockquote className="message-body">
			{quote}
		</blockquote>
		<cite className="message-author">
			{author.split(/\n/)[0]}
			{author.split(/\n/)[1] &&
				<span className="author-role">{author.split(/\n/).slice(1).join(' ')}</span>
			}
		</cite>
	</article>
)

Testimonial.propTypes = {
	quote: PropTypes.string,
	author: PropTypes.string,
	className: PropTypes.string
}

export default Testimonial
