var proxy = require('http-proxy-middleware')

module.exports = {
	siteMetadata: {
		title: 'Montana History Center',
		description:
			'To provide awareness to the general public in Montana that there is money available to build a new MT historical society building, and that the best location is the former capital hill mall site. This location is better than the alternative/current location because we will be able to showcase all the historical artifacts and the location will drive more tourists because its more accessible.',
		menuLinks:[
			{
				name:'Mall Site',
				placement: ['navbar'],
				url:'/why-the-mall-site'
			},
			{
				name: 'FAQ',
				placement: ['navbar'],
				url: '/montana-heritage-center-faq'
			},
			{
				name: 'Stories of Support',
				placement: ['navbar'],
				url: '/stories-of-support'
			},
			{
				name: 'News and Opinion',
				placement: ['navbar'],
				url: '/news-and-opinion'
			},
			{
				name: 'About Us',
				placement: ['footer'],
				url: '/about'
			},
			{
				name: 'Contact Us',
				placement: ['footer'],
				url: '/contact'
			},
			{
				name: 'Terms of Use',
				placement: ['footer'],
				url: '/terms'
			},
			{
				name: 'Privacy',
				placement: ['footer'],
				url: '/privacy'
			},
			{
				name: 'Your Privacy Rights',
				placement: ['footer'],
				url: '/privacy#your-rights'
			},
		]
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sass',
		{
			// keep as first gatsby-source-filesystem plugin for gatsby image support
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/static/img`,
				name: 'uploads',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/pages`,
				name: 'pages',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/src/img`,
				name: 'images',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-relative-images',
						options: {
							name: 'uploads',
						},
					},
					{
						resolve: 'gatsby-remark-images',
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 2048,
						},
					},
					{
						resolve: 'gatsby-remark-copy-linked-files',
						options: {
							destinationDir: 'static',
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-netlify-cms',
			options: {
				modulePath: `${__dirname}/src/cms/cms.js`,
			},
		},
		{
			resolve: 'gatsby-plugin-web-font-loader',
			options: {
				google: {
					families: ['Noto Sans', 'Noto Serif']
				}
			}
		},
		{
			resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
			options: {
				develop: true, // Activates purging in npm run develop
				purgeOnly: ['/all.scss'], // applies purging only on the bulma css file
			},
		}, // must be after other CSS plugins
		'gatsby-plugin-netlify', // make sure to keep it last in the array
	],
	// for avoiding CORS while developing Netlify Functions locally
	// read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
	developMiddleware: app => {
		app.use(
			'/.netlify/functions/',
			proxy({
				target: 'http://localhost:9000',
				pathRewrite: {
					'/.netlify/functions/': '',
				},
			})
		)
	},
}
