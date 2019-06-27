import React from 'react'
import PropTypes from 'prop-types'
import FaqPageTemplate from '../../templates/faq-page'

const FaqPagePreview = ({ entry, widgetFor }) => (
	<FaqPageTemplate
		title={entry.getIn(['data', 'title'])}
		// heading={data.heading}
		// questions={data.questions || []}
	/>
)

FaqPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default FaqPagePreview
