import React from 'react'
import { Link } from 'gatsby'

import './Footer.scss'

import Facebook from '../img/social/facebook.svg'
import Twitter from '../img/social/twitter.svg'

const year = new Date().getFullYear();

const Footer = ({ menuLinks, socialLinks, siteCopy, siteCreator }) => {
	return (
		<footer className="footer has-bg-base">
			<section className="social">
				<div className="container">
					{ socialLinks.facebook &&
						<a title="facebook" href={socialLinks.facebook}>
							<Facebook />
						</a>
					}
					{ socialLinks.twitter &&
						<a title="twitter" href={socialLinks.twitter}>
							<Twitter />
						</a>
					}
				</div>
			</section>
			<section className="menu section">
				<div className="container">
					<ul className="menu-list">
						{
							menuLinks.map(link => (
								<li key={link.name}>
									<Link className="menu-item" to={`/${link.url}`}>
										{link.name}
									</Link>
								</li>
							))
						}
					</ul>
					<div className="footer-copy">
						<p>Copyright &copy; {year}
							<strong>{siteCopy}.</strong>
							<br/>All rights reserved.
						</p>
						<p>Website by <a href={siteCreator.url} target="_blank">{siteCreator.name}</a></p>
					</div>
				</div>
			</section>
		</footer>
	)
}

export default Footer
