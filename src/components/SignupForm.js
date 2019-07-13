import React from 'react'

import addToMailchimp from 'gatsby-plugin-mailchimp'

import Facebook from '../img/social/facebook.svg'
import Twitter from '../img/social/twitter.svg'

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

	handleFocus = e => {
		const field = e.target.closest('.field')
		field.classList.remove('required-error')
		field.classList.remove('mismatch-error')
	}

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
				} else if(!validateField(input)) {
					valid = false
					field.classList.add('mismatch-error')
				} else {
					field.classList.remove('required-error')
					field.classList.remove('mismatch-error')
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

		function validateField(input) {

			let isValid = true;

			switch(input.name) {

				case 'email':
					isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value)
					break;

				case 'FNAME':
				case 'LNAME':
					isValid = /^[\w\s-_]{2,}$/.test(input.value.trim())
					break;

				case 'ZIP':
					isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(input.value.trim())
					break;

				default:
					break;
			}

			return isValid
		}
	}

	handleSubmit = e => {

		e.preventDefault()

		const form = e.target.closest('form')

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
				}
			})
			.catch( (err) => {
				return this.setState({ errorMessage: err && err.message ? err.message : '' })
			})
	}

	shareViaPlatform = (e) => {

		switch (e.target.closest('[title]').title) {
			case 'facebook':
				return window.open(`https://www.facebook.com/sharer/sharer.php
				?u=https%3A%2F%2Fwww.montanaheritagecenter.org%2F`,
					'fb-share', 'height=300,width=400')

			case 'twitter':
				return window.open(`https://twitter.com/intent/tweet
				?url=https%3A%2F%2Fwww.montanaheritagecenter.org%2F
				&text=Sign%20our%20petition%20to%20Build%20the%20Montana%20Heritage%20Center%20at%20the%20former%20Capital%20Hill%20Mall%20site.`,
					'twitter-share',
					'height=550,width=420')
		}
	}

	render() {
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
							<em>Please help us spread the word!</em>
							<ul className="share-links">
								<li title="facebook" onClick={this.shareViaPlatform}>
									<Facebook />
									Post to Facebook
								</li>
								<li title="twitter" onClick={this.shareViaPlatform}>
									<Twitter />
									Post to Twitter
								</li>
							</ul>
						</div>

					: <React.Fragment>
							<h2>Sign the petition</h2>
							<p>Elected officials, local businesses and residents agree the mall site provides the most benefit to the community.</p>
							<form
								name="signup"
								method="post"
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
								<div className="field field-required"
									data-reqtxt={`First name is required`}
									data-mismatch={`That doesn't look like a valid name`}>
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
								<div className="field field-required"
									data-reqtxt={`Last name is required`}
									data-mismatch={`That doesn't look like a valid name`}>
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
								<div className="field field-required"
									data-reqtxt={`An email address is required`}
									data-mismatch={`That doesn't look like a valid email`}>
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
								<div className="field field-required"
									data-reqtxt={`A zip code is required`}
									data-mismatch={`That doesn't look like a valid zip code`}>
									<label className="label" htmlFor={'zip'}>
										Zip
									</label>
									<div className="control">
										<input
											className="input"
											type={'text'}
											name={'ZIP'}
											onChange={this.handleChange}
											onFocus={this.handleFocus}
											id={'zip'}
											required={true}
										/>
									</div>
								</div>
								<div className="field">
									<button
										className="button button-secondary is-block"
										type="submit"
										onClick={this.handleSubmit}
										>
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
