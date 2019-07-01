import React from 'react'
import PropTypes from 'prop-types'
import { ContentPageTemplate as ContactPageTemplate } from '../../templates/content-page'

const ContactPagePreview = ({ entry, widgetFor }) => {
	const data = entry.getIn(['data']).toJS()

	if (data) {
		return (
			<ContactPageTemplate
				title={data.title}
				heading={data.heading}
				image={data.image}
				heading={data.heading}
				content={widgetFor('body')}
			/>
		)
	} else {
		return <div>Loading...</div>
	}
}

ContactPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default ContactPagePreview
