import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
	const data = entry.getIn(['data']).toJS()

	if (data) {
		return (
			<IndexPageTemplate
				image={data.image}
				title={data.title}
				eyebrow={data.eyebrow}
				heading={data.heading}
				subheading={data.subheading}
				cta={data.cta}
				testimonials={data.testimonials || []}
				mainpitch={data.mainpitch}
				supporters={data.supporters || []}
				featuredLinks={data.featuredLinks || []}
			/>
		)
	} else {
		return <div>Loading...</div>
	}
}

IndexPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	getAsset: PropTypes.func,
}

export default IndexPagePreview
