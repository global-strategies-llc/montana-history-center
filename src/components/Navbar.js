import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

import './Navbar.scss'

import logo from '../img/logo.svg'

class Navbar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			active: false,
			navBarActiveClass: '',
		}
	}

	static propTypes = {
		menuLinks: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				url: PropTypes.string
			})
		),
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
				this.state.active
					? this.setState({
						navBarActiveClass: 'is-active',
					})
					: this.setState({
						navBarActiveClass: '',
					})
			}
		)
	}

	render() {
		const {
			props: { menuLinks }
		} = this;
		return (
			<nav
				className="navbar is-transparent"
				role="navigation"
				aria-label="main-navigation"
			>
				<div className="container">

					<div className="navbar-brand">
						<Link to="/" className="navbar-item" title="Logo">
							<h4><strong>Montana</strong> History Center</h4>
							{/*<img src={logo} alt="Montana History Center" style={{ width: '88px' }} />*/}
						</Link>
					</div>

					<div className="navbar-button">
						<Link className="button button-invert" to="/petition">
							<span>Sign the Petition</span>
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
								<Link key={link.name} className="navbar-item" to={link.url}>
									{link.name}
								</Link>
							))
						}
						<div className="navbar-button">
							<Link className="button" to="/donate">
								<span>Contribute</span>
							</Link>
						</div>

					</div>

				</div>
			</nav>
		)
	}
}

export default Navbar
