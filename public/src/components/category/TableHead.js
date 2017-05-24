import React, { Component } from 'react'

class TableHead extends Component {

	constructor (props) {

		super(props)

		this.state = {

			checked: false
		}

		this.handleCheckAll = this.handleCheckAll.bind(this)
	} 

	handleCheckAll (e) {

		let value = !this.state.checked

		this.setState({

			checked: value
		})

		this.props.onCheckAll(value)
	}

	render () {

		return (<tr>
			<th></th>
			<th>
				<div className="btn-group table-checkbox" data-toggle="buttons">
					<label className={"btn" + (this.state.checked ? " active" : "")} onClick={this.handleCheckAll}>
						<input type="checkbox" name="checkall" autoComplete="off"/>
						<span className="glyphicon glyphicon-menu-down"></span>
					</label>
				</div>
			</th>
			<th>Название</th>
			<th></th>
			<th></th>
		</tr>)
	}
}

export default TableHead