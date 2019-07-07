import React from 'react'
import PropTypes from 'prop-types'
import { FaqPageTemplate } from '../../templates/faq-page'

const FaqPagePreview = ({ entry, widgetFor }) => {

	const data = entry.getIn(['data']).toJS()

	return (
		<FaqPageTemplate
			title={data.title}
			image={data.image}
			heading={data.heading}
			main={data.main}
		/>
	)
}

FaqPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default FaqPagePreview
