import React from 'react'
import PropTypes from 'prop-types'
import { MallSiteTemplate } from '../../templates/mallsite-page'

const MallSitePreview = ({ entry, widgetFor }) => {
	const data = entry.getIn(['data']).toJS()

	if (data) {
			return (
				<MallSiteTemplate
					title={data.title}
					image={data.image}
					heading={data.heading}
					cta={data.cta}
					midway={data.midway}
					closer={data.closer}
					testimonials={data.testimonials}
					mainpitch={data.mainpitch}
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
	widgetFor: PropTypes.func
}

export default MallSitePreview
