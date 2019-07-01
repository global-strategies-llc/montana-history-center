import React from 'react'
import PropTypes from 'prop-types'
import { NewsPageTemplate } from '../../templates/news-page'

const NewsPagePreview = ({ entry, widgetFor }) => {
	const data = entry.getIn(['data']).toJS()

	if (data) {
		return (
			<NewsPageTemplate
				title={data.title}
				image={data.image}
				heading={data.heading}
				cta={data.cta}
				main={data.main}
			/>
		)
	} else {
		return <div>Loading...</div>
	}
}

NewsPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default NewsPagePreview
