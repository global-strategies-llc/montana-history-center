import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { useInView } from 'react-intersection-observer'

import './Timeline.scss'

const TimelineEntry = function({ date, description, className }) {

	const [ref, inView] = useInView({
		/* Optional options */
		threshold: 1,
		rootMargin: '0% 0% -25%',
	})

	return (
		<div className={ [ 'timeline-entry', inView ? 'timeline-show' : '', className ].join(' ') } ref={ref}>
			<div className="timeline-date">
				<h3 className="is-size-2">{date}</h3>
			</div>
			<div className="timeline-marker"></div>
			<div className="timeline-content">
				<p>{description}</p>
			</div>
		</div>
	)
}

const Timeline = function( { entries, className } ) {

	return (
		<div className={ [ className, 'timeline'].join(' ') }>
			{
				entries.map( (entry, i) =>
					<TimelineEntry key={i} { ...entry } className={ i % 2 === 0 ? 'timeline-left' : 'timeline-right' }/>
			)}
		</div>
	)
}

export default Timeline
