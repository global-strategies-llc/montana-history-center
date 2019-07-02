import React from 'react'
import PropTypes from 'prop-types'
import { ContentPageTemplate as AboutPageTemplate } from '../../templates/content-page'

const AboutPagePreview = ({ entry, widgetFor }) => {

	const data = entry.getIn(['data']).toJS()

	if (data) {
		return (
			<AboutPageTemplate
				title={data.title}
				heading={data.heading}
				image={data.image}
				content={widgetFor('body')}
			/>
		)
	} else {
		return <div>Loading...</div>
	}
}

AboutPagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func,
	}),
	widgetFor: PropTypes.func,
}

export default AboutPagePreview
