import React, { Component } from 'react'
import SortableTable from './SortableTable'

class Sortable extends Component {

	constructor (props) {

		super(props)

		this.onSortEnd = this.onSortEnd.bind(this)
	}

	onSortEnd ({oldIndex, newIndex}) {

		this.props.onListSwap(oldIndex, newIndex)
	}

	render() {

		return (<SortableTable data={this.props.data} helperClass={'sortable-shadow'} pressDelay={200} useDragHandle={true} onSortEnd={this.onSortEnd} onCheckItem={this.props.onCheckItem} onChangeClick={this.props.onChangeClick} onRemoveClick={this.props.onRemoveClick}/>)
	}
}

export default Sortable