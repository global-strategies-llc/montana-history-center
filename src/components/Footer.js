import React from 'react'
import { Link } from 'gatsby'

import './Footer.scss'

import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'

const Footer = ({ menuLinks }) => {
	return (
		<footer className="footer has-background-black has-text-white-ter">
			<div className="container">
				<div className="social">
					<a title="facebook" href="https://facebook.com">
						<img
							src={facebook}
							alt="Facebook"
							style={{ width: '1em', height: '1em' }}
						/>
					</a>
					<a title="twitter" href="https://twitter.com">
						<img
							className="fas fa-lg"
							src={twitter}
							alt="Twitter"
							style={{ width: '1em', height: '1em' }}
						/>
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
				</div>
			</div>
		</footer>
	)
}

export default Footer
