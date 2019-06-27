import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './Faq.scss'

const Faq = function({ question, answer, className }) {

	const [toggleState, setToggleState] = useState('close'),
				[currHeight, setCurrHeight] = useState(0),
				ref = useRef(null);

	function toggle() {
		setToggleState(toggleState === 'close' ? 'open' : 'close');
	}

	function updateHeight() {
		ref.current.classList.add('show');
		setCurrHeight(ref.current.clientHeight);
		ref.current.classList.remove('show');
	}

	useEffect(() => {
		window.removeEventListener('resize', updateHeight);
		window.addEventListener('resize', updateHeight);

		currHeight === 0 ?
			updateHeight()
			: null;
	})

	return (
		<li className={ [className, `faq ${toggleState}`].join(' ') }>
			<h6 onClick={toggle}>{question}</h6>
			<div
				className="faq-answer"
				style={ { '--fullHeight' : `${currHeight}px` }}
				ref={ref}
			>
				<p>{answer}</p>
			</div>
		</li>
	)
}

Faq.propTypes = {
	question: PropTypes.string,
	answer: PropTypes.string,
	className: PropTypes.string
}

export default Faq
