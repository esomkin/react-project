import React, { Component } from 'react'

class Page extends Component {

	constructor (props) {

		super(props)

		this.handlePageNumClick = this.handlePageNumClick.bind(this)
	}

	handlePageNumClick (e) {

		e.preventDefault()

		return this.props.onPageNumClick()
	}

	render () {

		let disabled = Math.ceil(this.props.list_count / this.props.page_per) <= this.props.page_num

		return (<div className="view-page">
			<a href="/" className="btn btn-block btn-page" disabled={disabled} onClick={this.handlePageNumClick}>Следующая страница</a>
		</div>)
	}
}

export default Page