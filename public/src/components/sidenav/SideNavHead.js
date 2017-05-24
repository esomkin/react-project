import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SideNavItem from './SideNavItem'

class SideNavHead extends Component {

	render () {

		const navhead = this.props.data
		const childs = navhead.childs.map((element, index, list) => {

			return (<SideNavItem key={element.id} data={element}/>)
		})

		return (<div className="panel">
			<div className="panel-heading">
				<a className="collapsed" href={'#group' + navhead.id} data-toggle="collapse" data-parent="#accordion">{navhead.text}</a>
			</div>
			<div id={'group' + navhead.id} className="panel-collapse collapse">
				<ul className="list-group">
					{childs}
				</ul>
			</div>
		</div>)
	}
}

SideNavHead.propTypes = {

	data: PropTypes.object.isRequired
}

export default SideNavHead