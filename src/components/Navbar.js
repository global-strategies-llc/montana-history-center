import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import './Navbar.scss'

// import logo from '../img/logo.svg'

class Navbar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			active: false,
			sticky: false,
			navBarActiveClass: '',
			navBarStickyClass: '',
		}
		this.handleScroll = this.handleScroll.bind(this);
	}

	static propTypes = {
		menuLinks: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				url: PropTypes.string
			})
		),
	}

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
		window.dataLayer && window.dataLayer.push({'event': 'navbar-mounted'})
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

	toggleHamburger = () => {
		// toggle the active boolean in the state
		this.setState(
			{
				active: !this.state.active,
			},
			// after state has been updated,
			() => {
				// set the class in state for the navbar accordingly
				this.state.active ?
					this.setState({
						navBarActiveClass: 'is-active',
					})
					: this.setState({
						navBarActiveClass: '',
					})
			}
		)
	}

	handleScroll(e) {
		// toggle the sticky boolean in the state
		this.setState(
			{
				sticky: window.scrollY > 100,
			},
			// after state has been updated,
			() => {
				// set the class in state for the navbar accordingly
				this.state.sticky ?
					this.setState({
						navBarStickyClass: 'is-sticky',
					})
					: this.setState({
						navBarStickyClass: '',
					})
			}
		)
	}

	render() {
		const {
			props: { menuLinks, signup = false }
		} = this;
		return (
			<nav
				className={`navbar ${this.state.navBarStickyClass} `}
				role="navigation"
				aria-label="main-navigation"
			>
				<div className="container">

					<div className="navbar-brand">
						<Link to="/" className="navbar-item" title="Home Page">
							<h4><strong>Montana</strong> History Center</h4>
							{/*<img src={logo} alt="Montana History Center" style={{ width: '88px' }} />*/}
						</Link>
					</div>

					{/* Hamburger menu */}
					<div
						className={`navbar-burger burger ${this.state.navBarActiveClass}`}
						data-target="navMenu"
						onClick={() => this.toggleHamburger()}
					>
						<span />
						<span />
						<span />
					</div>

					<div
						id="navMenu"
						className={`navbar-menu ${this.state.navBarActiveClass}`}
					>
						{
							menuLinks.map(link => (
								<Link key={link.name} className="navbar-item" to={`/${link.url}`} activeClassName="is-active-item">
									{link.name}
								</Link>
							))
						}
						<div className="navbar-button">
							<a className="button dbox-donation-button custom-dbox-popup" href="https://donorbox.org/mall-site-petition">
								<span>Contribute</span>
							</a>
						</div>

						<div className="navbar-button" onClick={() => this.toggleHamburger()}>
							{ signup ?
								<a className="button button-invert" href="#petition">
									<span>Sign the Petition</span>
								</a>
								: <Link className="button button-invert" to="/#petition">
										<span>Sign the Petition</span>
									</Link>
							}
						</div>

					</div>

				</div>
			</nav>
		)
	}
}

export default Navbar
