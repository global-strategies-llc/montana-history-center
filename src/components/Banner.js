import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './Banner.scss'

const Banner = ({ text, cta, className }) => {
	const internal = /^\/(?!\/)/.test(cta.url),
				isDark = /bg-(primary|neutral)/.test(className)

	return (
		<div className={ [className, 'banner section'].join(' ') }>
			<div className="container">
				<div className="banner-message">
					{ text.split(/\n/)[0] }
					{ text.split(/\n/)[1] &&
						<span className="banner-emphasis"> {text.split(/\n/).slice(1).join(' ')}</span>
					}
				</div>
				{ internal ?
					<Link className={`button ${ isDark && 'button-outline' } `} to={cta.url}>{cta.text}</Link>
					: <a className={`button ${ isDark && 'button-outline' } `} href={cta.url}>{cta.text}</a>
				}
			</div>
		</div>
	)
}

Banner.propTypes = {
	text: PropTypes.string,
	cta: PropTypes.object,
	className: PropTypes.string
}

export default Banner
