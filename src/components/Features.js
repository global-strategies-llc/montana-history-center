import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const WithLinkWrap = ({ link, children }) => (
	<React.Fragment>
		{ link ?
			<Link className="feature-link" to={`/${link.url}`}>
				{children}
				{link.text &&
					<span className="feature-text">{link.text}</span>
				}
			</Link>
			: <React.Fragment>{children}</React.Fragment>
		}
	</React.Fragment>
)

const FeatureGrid = ({ cols, gridItems }) => (
	<div className="features columns is-multiline">
		{gridItems.map( (item, i) => (
			<div key={i} className={`column is-${12 / (cols || 2)}`}>
				<section className="feature section">
					<WithLinkWrap link={item.link}>
						<div className="has-text-centered">
							{item.image &&
								<div className="feature-image">
									<PreviewCompatibleImage imageInfo={
										'object' === item.image ?
											item.image
											: { image: item.image, alt: item.text }
									} />
								</div>
							}
						</div>
					</WithLinkWrap>
					{item.text &&
						<div className="feature-description">
							<p>{item.text}</p>
						</div>
					}
				</section>
			</div>
		))}
	</div>
)

FeatureGrid.propTypes = {
	cols: PropTypes.number,
	gridItems: PropTypes.arrayOf(
		PropTypes.shape({
			image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
			text: PropTypes.string,
		})
	),
}

WithLinkWrap.propTypes = {
	link: PropTypes.shape({
		url: PropTypes.string,
		text: PropTypes.string
	}),
	children: PropTypes.object
}

export default FeatureGrid
