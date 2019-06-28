import React from 'react'
import PropTypes from 'prop-types'
import StoriesPageTemplate from '../../templates/stories-page'

const StoriesPagePreview = ({ entry, widgetFor }) => (
	<StoriesPageTemplate
		title={entry.getIn(['data', 'title'])}
		// heading={data.heading}
		// questions={data.questions || []}
	/>
)

StoriesPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default StoriesPagePreview
