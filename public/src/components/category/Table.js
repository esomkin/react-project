import React, { Component } from 'react'
import TableHead from './TableHead'
import TableEmpty from './TableEmpty'
import Sortable from './Sortable'

class Table extends Component {

	render () {

		const list_length = this.props.list.length

		return (<div className="view-table">
			<table className="table table-striped">
				<thead>
					<TableHead onCheckAll={this.props.onCheckAll}/>
				</thead>
				{ (list_length > 0) ? <Sortable data={this.props.list} onListSwap={this.props.onListSwap} onCheckItem={this.props.onCheckItem} onChangeClick={this.props.onChangeClick} onRemoveClick={this.props.onRemoveClick}/> : <TableEmpty/> }
			</table>
		</div>)
	}
}

export default Table