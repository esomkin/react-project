import React, { Component } from 'react'
import TopbarContainer from './../../containers/category/Topbar'
import TableContainer from './../../containers/category/Table'
import PageContainer from './../../containers/category/Page'
import Create from './Create'
import Search from './Search'

class Category extends Component {

	constructor (props) {

		super(props)

		this.searchSubmit = this.searchSubmit.bind(this)
	}

	searchSubmit (values) {

		this.props.onSearchSubmit(values)
	}

	render () {

		const load = this.props.load

		return (<div className="content">
			<TopbarContainer/>
			<TableContainer/>
			<PageContainer/>
			<div className={"indi-load" + ((load) ? " indi-show" : "")}></div>
			<div id="form" className="slippy-pane">
				<aside className="slippy-l">
					Slippy from the left side
				</aside>
				<aside className="slippy-r">
					<Search onSubmit={this.searchSubmit}/>
				</aside>
				<aside className="slippy-r">
					<Create onCreateSubmit={this.props.onCreateSubmit}/>
				</aside>
			</div>
		</div>)
	}
}

export default Category