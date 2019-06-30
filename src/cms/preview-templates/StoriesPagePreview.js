import React from 'react'
import PropTypes from 'prop-types'
import StoriesPageTemplate from '../../templates/stories-page'

const StoriesPagePreview = ({ entry, widgetFor }) => {
	const data = entry.getIn(['data']).toJS()

	if (data) {
			return (
				<StoriesPageTemplate
					image={data.image}
					title={data.title}
					heading={data.heading}
					cta={data.cta}
					callout={data.callout || {}}
					groups={data.groups || []}
				/>
		)
	} else {
		return <div>Loading...</div>
	}
}

StoriesPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default StoriesPagePreview
