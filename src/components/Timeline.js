import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { useInView } from 'react-intersection-observer'

import './Timeline.scss'

const TimelineEntry = function({ date, description, className, style }) {

	const [ref, inView] = useInView({
		/* Optional options */
		threshold: 1,
		rootMargin: '10% 50% -25%',
	})

	return (
		<div
			className={ [ 'timeline-entry', inView ? 'timeline-show' : '', className ].join(' ') }
			ref={ref}
			style={style}
		>
			<div className="timeline-date">
				<h3 className="is-size-3">{date}</h3>
			</div>
			<div className="timeline-marker"></div>
			<div className="timeline-content">
				<p>{description}</p>
			</div>
		</div>
	)
}

const Timeline = function( { entries, className } ) {
	const positions = entries.map( (entry, i) => {
		return {
			leftRight: i % 2 === 0 ? 'timeline-left' : 'timeline-right', // [or] Math.ceil(Math.random() * 1.8) === 2
			styles: {
				marginTop: `${( parseInt(entry.date.slice(-4), 10) - parseInt(entries[Math.max(i - 1, 0)].date.slice(-4), 10) )}rem`
			}
		}
})
	return (
		<div className={ [ className, 'timeline'].join(' ') }>
			{
				entries.map( (entry, i) =>
					<TimelineEntry
						key={i}
						{ ...entry }
						className={positions[i].leftRight}
						style={positions[i].styles}
					/>
			)}
		</div>
	)
}

export default Timeline
