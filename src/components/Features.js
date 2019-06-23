import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FeatureGrid = ({ cols, gridItems }) => (
	<div className="columns is-multiline">
		{gridItems.map( (item, i) => (
			<div key={i} className={`column is-${12 / (cols || 2)}`}>
				<section className="section">
					<div className="has-text-centered">
						{item.image &&
							<div className="feature-image">
								<PreviewCompatibleImage imageInfo={item.image} />
							</div>
						}
						<div className="feature-description">
							{item.text &&
								<p>{item.text}</p>
							}
							{item.link &&
								<Link to={item.link.url}>
									{item.link.text}
								</Link>
							}
						</div>
					</div>
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

export default FeatureGrid
