import React from 'react'
import PropTypes from 'prop-types'
import { ContentPageTemplate as AboutPageTemplate } from '../../templates/content-page'

const AboutPagePreview = ({ entry, widgetFor }) => (
	<AboutPageTemplate
		title={entry.getIn(['data', 'title'])}
		content={widgetFor('body')}
	/>
)

AboutPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default AboutPagePreview
