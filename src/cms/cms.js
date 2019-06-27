import CMS from 'netlify-cms-app'
// import uploadcare from 'netlify-cms-media-library-uploadcare'
// import cloudinary from 'netlify-cms-media-library-cloudinary'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import MallSitePagePreview from './preview-templates/MallSitePagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import FaqPagePreview from './preview-templates/FaqPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'

// CMS.registerMediaLibrary(uploadcare)
// CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('faq', FaqPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('mall-site', MallSitePagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

// /* globals createClass, h */
// var CtaControl = createClass({
// 	handleChange: function(e) {
// 		this.props.onChange(e.target.value.split(',').map((e) => e.trim()));
// 	},

// 	render: function() {
// 		var value = this.props.value;
// 		return h('input', { type: 'text', value: value ? value.join(', ') : '', onChange: this.handleChange });
// 	}
// });

// var CtaPreview = createClass({
// 	render: function() {
// 		return h('ul', {},
// 			this.props.value.map(function(val, index) {
// 				return h('li', {key: index}, val);
// 			})
// 		);
// 	}
// });

// CMS.registerWidget('cta', CtaControl, CtaPreview);
