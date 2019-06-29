import React from 'react'
import PropTypes from 'prop-types'
import NewsPageTemplate from '../../templates/news-page'

const NewsPagePreview = ({ entry, widgetFor }) => (
	<NewsPageTemplate
		title={entry.getIn(['data', 'title'])}
		// heading={data.heading}
		// questions={data.questions || []}
	/>
)

NewsPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default NewsPagePreview
