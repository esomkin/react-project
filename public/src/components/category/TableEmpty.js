import React, { Component } from 'react'

class TableEmpty extends Component {

	render () {

		return (<tbody>
			<tr>
				<td className="col-sort"></td>
				<td></td>
				<td>Нет данных</td>
				<td className="col-icon"></td>
				<td></td>
			</tr>
		</tbody>)
	}
}

export default TableEmpty