import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

import './Testimonials.scss'

const Testimonials = ({ testimonials }) => (
	<div className="testimonials-container">
		{testimonials.map(testimonial => (
			<article key={v4()} className="message">
				<blockquote className="message-body">
					{testimonial.quote}
					<br />
					<cite>
						{testimonial.author.split(/\n/)[0]}
						{testimonial.author.split(/\n/)[1] &&
							<span className="author-role">{testimonial.author.split(/\n/).slice(1).join(' ')}</span>
						}
					</cite>
				</blockquote>
			</article>
		))}
	</div>
)

Testimonials.propTypes = {
	testimonials: PropTypes.arrayOf(
		PropTypes.shape({
			quote: PropTypes.string,
			author: PropTypes.string,
		})
	),
}

export default Testimonials
