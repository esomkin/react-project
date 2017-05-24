import React, { Component } from 'react'
import Bcrumb from './Bcrumb'
import SlippyPane from './../../third-party/slippypane/build/slippypane.min'

class Topbar extends Component {

	constructor (props) {

		super(props)

		this.handleSnapClick = this.handleSnapClick.bind(this)
		this.handlePerPageClick = this.handlePerPageClick.bind(this)
		this.handleSortOrderClick = this.handleSortOrderClick.bind(this)
		this.handleRemoveClick = this.handleRemoveClick.bind(this)
		this.handleCreateClick = this.handleCreateClick.bind(this)
	}

	handleSnapClick (e) {

		e.preventDefault()

		SlippyPane('#main').open({

			side: 'l'
		})
	}

	handlePerPageClick (e) {

		e.preventDefault()

		let target = e.target
		let value = Number(target.textContent)

		return this.props.onPagePerClick(value)
	}

	handleSortOrderClick (e) {

		e.preventDefault()

		let target = e.target
		let value = target.textContent.toUpperCase()

		return this.props.onSortOrderClick(value)
	}

	handleRemoveClick (e) {

		e.preventDefault()
		
		return this.props.onRemoveClick()	
	}

	handleSearchClick (e) {

		e.preventDefault()

		SlippyPane('#form').open({

			side: 'r',
			index: 0
		})
	}

	handleCreateClick (e) {

		e.preventDefault()
		
		this.props.onCreateClick()
	}

	render () {

		return (<div className="view-topbar">
			<div className="row">
				<div className="col-xs-2">
					<a href="/" className="topbar-icon icon-snap" onClick={this.handleSnapClick}></a>
				</div>
				<div className="col-xs-4">
					<Bcrumb data={this.props.crumb}/>
				</div>
				<div className="col-xs-6">
					<a href="/" className="topbar-icon icon-create" onClick={this.handleCreateClick}></a>
					<a href="/" className="topbar-icon icon-remove" onClick={this.handleRemoveClick}></a>
					<a href="/" className="topbar-icon icon-search" onClick={this.handleSearchClick}>
						<span className={"badge" + (!Object.keys(this.props.filter).length ? " hidden" : "")}>o</span>
					</a>
					<div className="dropdown">
						<button className="btn dropdown-toggle topbar-icon icon-option" type="button" data-toggle="dropdown">
							<span className={"badge" + (!(this.props.sort_order == 'ASC') ? " hidden" : "")}>o</span>
						</button>
						<ul className="dropdown-menu dropdown-menu-right dropdown-option">
							<li className="dropdown-header">Per page</li>
							<li>
								<a href="/" className={(this.props.page_per == 5) ? "active" : ""} onClick={this.handlePerPageClick}>5</a>
							</li>
							<li>
								<a href="/" className={(this.props.page_per == 10) ? "active" : ""} onClick={this.handlePerPageClick}>10</a>
							</li>
							<li className="divider"></li>
							<li className="dropdown-header">Sort order</li>
							<li>
								<a href="/" className={(this.props.sort_order == 'DESC') ? "active" : ""} onClick={this.handleSortOrderClick}>Desc</a>
							</li>
							<li>
								<a href="/" className={(this.props.sort_order == 'ASC') ? "active" : ""} onClick={this.handleSortOrderClick}>Asc</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>)
	}
}

export default Topbar