import React from 'react'
import PropTypes from 'prop-types'
import { ContentPageTemplate as ContactPageTemplate } from '../../templates/content-page'

const ContactPagePreview = ({ entry, widgetFor }) => (
	<ContactPageTemplate
		title={entry.getIn(['data', 'title'])}
		content={widgetFor('body')}
	/>
)

ContactPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default ContactPagePreview
