import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SideNavHead from './SideNavHead'

class SideNav extends Component {

	render () {

		const panels = this.props.data.map((element, index, list) => {

			return (<SideNavHead key={element.id} data={element}/>)
		})

		return (<div className="panel-group" id="accordion">
			{panels}
		</div>)
	}
}

SideNav.propTypes = {

	data: PropTypes.array.isRequired
}

export default SideNav