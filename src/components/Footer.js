import React from 'react'
import { Link } from 'gatsby'

import './Footer.scss'

import Facebook from '../img/social/facebook.svg'
import Twitter from '../img/social/twitter.svg'

const year = new Date().getFullYear();

const Footer = ({ menuLinks, siteCopy }) => {
	return (
		<footer className="footer has-bg-neutral">
			<div className="container">
				<div className="social">
					<a title="facebook" href="https://facebook.com">
						<Facebook />
					</a>
					<a title="twitter" href="https://twitter.com">
						<Twitter />
					</a>
				</div>
				<section className="menu">
					<ul className="menu-list">
						{
							menuLinks.map(link => (
								<li key={link.name}>
									<Link className="menu-item" to={link.url}>
										{link.name}
									</Link>
								</li>
							))
						}
					</ul>
				</section>
				<div className="footer-copy">
					<p>Copyright &copy; {year}
						<strong>{siteCopy}</strong>
						<br/>All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer
