import React from 'react'
import Helmet from 'react-helmet'

import './all.scss'
import vars from './variables.scss'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import useSiteMetadata from './SiteMetadata'

const TemplateWrapper = ({ title, description, keywords, children }) => {
	const { title: defaultTitle, description: defaultDescription, menuLinks } = useSiteMetadata()
	return (
		<div>
			<Helmet>
				<html lang="en" />
				<title>{title || defaultTitle}</title>
				<meta name="description" content={description || defaultDescription} />
				{ keywords &&
					<meta name="keywords" content={keywords} />
				}
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/img/icons/apple-touch-icon-100.jpg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					href="/img/icons/favicon-2-100.jpg"
					sizes="32x32"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					href="/img/icons/favicon-1-100.jpg"
					sizes="16x16"
				/>

				<link
					rel="mask-icon"
					href="/img/safari-pinned-tab.svg"
					color="#ff4400"
				/>
				<meta name="theme-color" content={vars.base} />

				<meta property="og:type" content="business.business" />
				<meta property="og:title" content={title} />
				<meta property="og:url" content="/" />
				<meta property="og:image" content="/img/og-image.jpg" />
			</Helmet>
			<Navbar menuLinks={menuLinks.filter( link => link.placement.includes('navbar') )} />
			<main>{children}</main>
			<Footer
				siteCopy={title}
				menuLinks={menuLinks.filter( link => link.placement.includes('footer') )}
			/>
		</div>
	)
}

export default TemplateWrapper
