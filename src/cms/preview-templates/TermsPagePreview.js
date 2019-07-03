import React from 'react'
import PropTypes from 'prop-types'
import { ContentPageTemplate as TermsPageTemplate } from '../../templates/content-page'

const TermsPagePreview = ({ entry, widgetFor }) => {

	const data = entry.getIn(['data']).toJS()

	if (data) {
		return (
			<TermsPageTemplate
				title={data.title}
				heading={data.heading}
				content={widgetFor('body')}
			/>
		)
	} else {
		return <div>Loading...</div>
	}
}

TermsPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default TermsPagePreview
