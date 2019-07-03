import CMS from 'netlify-cms-app'
// import uploadcare from 'netlify-cms-media-library-uploadcare'
// import cloudinary from 'netlify-cms-media-library-cloudinary'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import MallSitePagePreview from './preview-templates/MallSitePagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import FaqPagePreview from './preview-templates/FaqPagePreview'
import StoriesPagePreview from './preview-templates/StoriesPagePreview'
import NewsPagePreview from './preview-templates/NewsPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import TermsPagePreview from './preview-templates/TermsPagePreview'
import PrivacyPagePreview from './preview-templates/PrivacyPagePreview'

// CMS.registerMediaLibrary(uploadcare)
// CMS.registerMediaLibrary(cloudinary)

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('faq', FaqPagePreview)
CMS.registerPreviewTemplate('stories', StoriesPagePreview)
CMS.registerPreviewTemplate('news', NewsPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
CMS.registerPreviewTemplate('mallsite', MallSitePagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('terms', TermsPagePreview)
CMS.registerPreviewTemplate('privacy', PrivacyPagePreview)
