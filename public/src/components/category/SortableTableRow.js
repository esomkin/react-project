import React, { Component } from 'react'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'

const SortableTableHandle = SortableHandle(() => {

	return (<a className="table-icon icon-sort"></a>)
})

const SortableTableRow = SortableElement(({ data, onCheckItem, onChangeClick, onRemoveClick }) => {

	return (<tr>
		<td className="col-sort">
			<SortableTableHandle/>
		</td>
		<td>
			<div className="btn-group table-checkbox" data-toggle="buttons">
				<label className={"btn" + (data.checked ? " active" : "")} onClick={(e) => { onCheckItem(data.id) }}>
					<input type="checkbox" name="check" value="" autoComplete="off"/>
					<span className="glyphicon glyphicon-menu-down"></span>
				</label>
			</div>
		</td>
		<td>{data.text}</td>
		<td className="col-icon">
			<a href="/" className="table-icon icon-display state-display"></a>
		</td>
		<td>
			<div className="dropdown table-icon">
				<button className="btn dropdown-toggle" type="button" data-toggle="dropdown"></button>
				<ul className="dropdown-menu dropdown-menu-right dropdown-action">
					<li className="dropdown-header">Действия</li>
					<li>
						<a href="/" data-type="change" className="change" onClick={(e) => { e.preventDefault(); onChangeClick(data.id) }}>Изменение</a>
					</li>
					<li>
						<a href="/" data-type="remove" className="remove" onClick={(e) => { e.preventDefault(); onRemoveClick(data.id) }}>Удаление</a>
					</li>
				</ul>
			</div>
		</td>
	</tr>)
})

export default SortableTableRow