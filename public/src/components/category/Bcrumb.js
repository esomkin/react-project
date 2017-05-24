import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Bcrumb extends Component {

	render () {

		let crumb = this.props.data

		let nav = {

			url: '/',
			text: ''
		}

		if (crumb.length) {

			nav = crumb[crumb.length - 1]
		}

		return (<div className="view-bcrumb">
			<ol className="breadcrumb">
				<li>
					<div className="dropdown">
						<button className="btn dropdown-toggle" type="button" data-toggle="dropdown">...</button>
						<ul className="dropdown-menu">
							<li className="dropdown-header">Path</li>
							{ crumb.map((element, index, list) => {

								return (<li key={index + 1}>
									<Link to={element.url}>{element.text}</Link>
								</li>)
							}) }
						</ul>
					</div>
				</li>
				<li>
					<Link to={nav.url}>{nav.text}</Link>
				</li>
			</ol>
		</div>)
	}
}