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
			<div className="content has-text-centered">
				<div className="container">
					<Link to="/" className="footer-logo">
						<img
							src={logo}
							alt="Kaldi"
						/>
					</Link>
				</div>
			</div>
			<div className="content has-text-centered has-background-black has-text-white-ter">
				<div className="container">
					<div className="columns">
						<div className="column is-4">
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
									<li>
										<a
											className="navbar-item"
											href="/admin/"
											target="_blank"
											rel="noopener noreferrer"
										>
											Admin
										</a>
									</li>
								</ul>
							</section>
						</div>
						<div className="column is-4">
							<section>
								<ul className="menu-list">
									<li>
										<Link className="navbar-item" to="/blog">
											Latest Stories
										</Link>
									</li>
									<li>
										<Link className="navbar-item" to="/contact">
											Contact
										</Link>
									</li>
								</ul>
							</section>
						</div>
						<div className="column is-4 social">
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
							<a title="instagram" href="https://instagram.com">
								<img
									src={instagram}
									alt="Instagram"
									style={{ width: '1em', height: '1em' }}
								/>
							</a>
							<a title="vimeo" href="https://vimeo.com">
								<img
									src={vimeo}
									alt="Vimeo"
									style={{ width: '1em', height: '1em' }}
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
