import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SlippyPane from './../../third-party/slippypane/build/slippypane.min'

class SideNavItem extends Component {

	constructor (props) {

		super(props)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick (e) {

		SlippyPane('#main').close()	
	}

	render () {

		const nav = this.props.data

		return (<li className="list-group-item">
			<Link to={nav.url} onClick={this.handleClick}>{nav.text}</Link>
		</li>)
	}
}

SideNavItem.propTypes = {

	data: PropTypes.object.isRequired
}

export default SideNavItem