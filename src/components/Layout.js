import React from "react";
import Helmet from "react-helmet";

import "./all.scss";
import vars from "./variables.scss";

import Navbar from "../components/Navbar";
import Signup from "../components/Signup";
import Footer from "../components/Footer";

import useSiteMetadata from "./SiteMetadata";

const TemplateWrapper = ({
  title,
  description,
  keywords,
  hasSignup = false,
  children
}) => {
  const {
      title: defaultTitle,
      description: defaultDescription,
      menuLinks,
      socialLinks,
      siteCreator
    } = useSiteMetadata(),
    link = menuLinks
      .filter(link => typeof window !== `undefined` && window.location.href.indexOf(link.url) > -1)
      .pop();
  return (
    <div className="page-wrap">
      <Helmet>
        <html lang="en" />
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        {keywords && <meta name="keywords" content={keywords} />}
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
          rel="canonical"
          href={`https://www.montanaheritagecenter.org/${link ? link.url : ""}`}
        />
        <link
          rel="prefetch"
          href="https://donorbox.org/mall-site-petition?modal=true"
        />

        {/*
			<link
				rel="mask-icon"
				href="/img/safari-pinned-tab.svg"
				color="#ff4400"
			/>
		*/}
        <meta name="theme-color" content={vars.base} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:url"
          content={`https://www.montanaheritagecenter.org/${link ? link.url : ""}`}
        />

        {/*<meta property="og:image" content="/img/og-image.jpg" />*/}
      </Helmet>
      <Navbar
        menuLinks={menuLinks.filter(link => link.placement.includes("navbar"))}
        signup={hasSignup}
      />
      <main>{children}</main>
      {hasSignup && <Signup />}
      <Footer
        siteCopy={defaultTitle}
        socialLinks={socialLinks}
        menuLinks={menuLinks.filter(link => link.placement.includes("footer"))}
        siteCreator={siteCreator}
      />
    </div>
  );
};

export default TemplateWrapper;
