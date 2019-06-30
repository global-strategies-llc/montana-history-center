import React from 'react'
import { navigate } from 'gatsby-link'

function encode(data) {
	return Object.keys(data)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&')
}

class SignupForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = { isValidated: false }
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = e => {
		e.preventDefault()
		const form = e.target
		fetch('/', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: encode({
				'form-name': form.getAttribute('name'),
				...this.state,
			}),
		})
			.then(() => navigate(form.getAttribute('action')))
			.catch(error => alert(error))
	}

	render() {
		const { action } = this.props;
		return (
			<div className="signup-form content">
				<h2>Sign the petition</h2>
				<p>Elected officials, local businesses and residents agree the mall site provides the most benefit to the community.</p>
				<form
					name="signup"
					method="post"
					action={action}
					data-netlify="true"
					data-netlify-honeypot="bot-field"
					onSubmit={this.handleSubmit}
				>
					{/* The `form-name` hidden field is required to support form submissions without JavaScript */}
					<input type="hidden" name="form-name" value="signup" />
					<div hidden>
						<label>
							Don’t fill this out:{' '}
							<input name="bot-field" onChange={this.handleChange} />
						</label>
					</div>
					<div className="field">
						<label className="label" htmlFor={'firstname'}>
							First name
						</label>
						<div className="control">
							<input
								className="input"
								type={'text'}
								name={'firstname'}
								onChange={this.handleChange}
								id={'firstname'}
								required={true}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor={'lastname'}>
							Last name
						</label>
						<div className="control">
							<input
								className="input"
								type={'text'}
								name={'lastname'}
								onChange={this.handleChange}
								id={'lastname'}
								required={true}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor={'email'}>
							Email
						</label>
						<div className="control">
							<input
								className="input"
								type={'email'}
								name={'email'}
								onChange={this.handleChange}
								id={'email'}
								required={true}
							/>
						</div>
					</div>
					<div className="field">
						<label className="label" htmlFor={'zip'}>
							Zip
						</label>
						<div className="control">
							<input
								className="input"
								type={'text'}
								name={'zip'}
								onChange={this.handleChange}
								id={'zip'}
							/>
						</div>
					</div>
					<div className="field">
						<button className="button button-secondary is-block" type="submit">
							Register my Petition
						</button>
					</div>
				</form>
			</div>
		)
	}
}

export default SignupForm
