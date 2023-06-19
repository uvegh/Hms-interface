import React from 'react'
import { Link } from 'react-router-dom'
import LoginNav from './LoginNav'

export default function NotFound() {

	return (
		<>
			<LoginNav />
			<div className='container-fluid notFound-container' >
				<div className="notfound">
					<div className="notfound-404"></div>
					<h1>404</h1>
					<h2>Oops! Page Not  Found</h2>
					<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
					<Link>Back to homepage</Link>
				</div>
			</div>
		</>
	)
}
