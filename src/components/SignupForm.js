import React from 'react'
import { navigate } from 'gatsby-link'

import addToMailchimp from 'gatsby-plugin-mailchimp'

function encode(data) {
	return Object.keys(data)
		.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
		.join('&')
}

class SignupForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isValidated: false,
			isSending: false,
			isSuccess: false,
			isError: false,
			sendingMessage: 'Please wait a few moments while we process your signature.',
			successMessage: '',
			errorMessage: '',
			fields: {}
		}
	}

	renderMessage = html => {
		return {__html: html}
	}

	handleChange = e => {
		const newState = Object.assign({}, this.state.fields);
		newState[e.target.name] = e.target.value;
		this.setState({ fields: newState });
	}

	handleFocus = e =>
		e.target.closest('.field').classList.remove('required-error')

	resetState = () => {

		return new Promise((resolve, reject) => {
			this.setState({
				isValidated: false,
				isSending: false,
				isSuccess: false,
				isError: false
			}, () => resolve())
		})
	}

	validateForm = form => {

		const promise = new Promise((resolve, reject) => {

			let valid = true

			form.querySelectorAll('[required]').forEach( input => {
				const field = input.closest('.field')
				if(!this.state.fields[input.name]) {
					valid = false
					field.classList.add('required-error')
				} else {
					field.classList.remove('required-error')
				}
			})

			this.setState({ isValidated: valid },
				() => (
					this.state.isValidated ?
						resolve(this.state.fields)
						: reject('invalid form')
				)
			)
		})

		return promise
	}


	handleSubmit = e => {

		e.preventDefault()

		const form = e.target

		this.resetState()
			.then( () => this.validateForm(form) )
			.then( fields => {
				return new Promise((resolve, reject) =>
					this.setState({ isSending: true },
					() => resolve(fields))
				)
			})
			.then( fields => addToMailchimp(fields.email, { ...fields }) )
			.then(data => {
				console.log(data)
				switch(data.result) {

					case 'success':
						window.dataLayer && window.dataLayer.push({'event': 'mailchimp-signup'})
						return this.setState({
							isSending: false,
							isSuccess: true,
							successMessage: data.msg
						})


					case 'error':
						return this.setState({
							isSending: false,
							isError: true,
							errorMessage: data.msg
						})

					default:
						return setTimeout(() => {
							this.setState({
								isSending: false,
								isError: true,
								errorMessage: `We couldn't connect to the petition... please try again later!`
							})
						}, 10000)
					break;
				}
				if(data.result === 'success') {
				}
			})
			.catch( (err) => {
				return this.setState({ errorMessage: err && err.message ? err.message : '' })
			})
	}

	render() {
		const { action } = this.props;
		return (
			<div className="signup-form content">
				{
					this.state.isSending ?
						<div className="form-sending">
							<h2>Signing the petition...</h2>
							<p>{this.state.sendingMessage}</p>
						</div>

					: this.state.isError ?
						<div className="form-error">
							<h2>Sorry, there was a problem with your signup.</h2>
							<p dangerouslySetInnerHTML={this.renderMessage(this.state.errorMessage ||
									`We don't have any more details, please try again later.`
								)} />
						</div>

					: this.state.isSuccess ?
						<div className="form-success">
							<h2>Thank you for your support</h2>
							<p dangerouslySetInnerHTML={this.renderMessage(this.state.successMessage ||
									`We really appreciate you signing up!`
								)} />
						</div>

					: <React.Fragment>
							<h2>Sign the petition</h2>
							<p>Elected officials, local businesses and residents agree the mall site provides the most benefit to the community.</p>
							<form
								name="signup"
								method="post"
								action={action}
								data-netlify="true"
								data-netlify-honeypot="bot-field"
								onSubmit={this.handleSubmit}
								noValidate={true}
							>
								{/* The `form-name` hidden field is required to support form submissions without JavaScript */}
								<input type="hidden" name="form-name" value="signup" />
								<div hidden>
									<label>
										Don’t fill this out:{' '}
										<input name="bot-field" onChange={this.handleChange} />
									</label>
								</div>
								<div className="field field-required">
									<label className="label" htmlFor={'firstname'}>
										First name
									</label>
									<div className="control">
										<input
											className="input"
											type={'text'}
											name={'FNAME'}
											onChange={this.handleChange}
											onFocus={this.handleFocus}
											id={'firstname'}
											required={true}
										/>
									</div>
								</div>
								<div className="field field-required">
									<label className="label" htmlFor={'lastname'}>
										Last name
									</label>
									<div className="control">
										<input
											className="input"
											type={'text'}
											name={'LNAME'}
											onChange={this.handleChange}
											onFocus={this.handleFocus}
											id={'lastname'}
											required={true}
										/>
									</div>
								</div>
								<div className="field field-required">
									<label className="label" htmlFor={'email'}>
										Email
									</label>
									<div className="control">
										<input
											className="input"
											type={'email'}
											name={'email'}
											onChange={this.handleChange}
											onFocus={this.handleFocus}
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
											name={'ZIP'}
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
						</React.Fragment>
				}
			</div>
		)
	}
}

export default SignupForm
