import React from 'react'
import PropTypes from 'prop-types'
import { MallSiteTemplate } from '../../templates/mallsite-page'

const MallSitePreview = ({ entry, getAsset }) => {
	const data = entry.getIn(['data']).toJS()

	if (data) {
		return (
			<MallSiteTemplate
				image={data.image}
				title={data.title}
				eyebrow={data.eyebrow}
				heading={data.heading}
				midway={data.midway}
				closer={data.closer}
				cta={data.cta}
				testimonials={data.testimonials || []}
				mainpitch={data.mainpitch || {}}
			/>
		)
	} else {
		return <div>Loading...</div>
	}
}

MallSitePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	getAsset: PropTypes.func,
}

export default MallSitePreview
