import React, { Component } from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import SortableTableRow from './SortableTableRow'

const SortableTable = SortableContainer(({ data, onCheckItem, onChangeClick, onRemoveClick }) => {

	const rows = data.map((element, index, list) => {

		return (<SortableTableRow key={`item-${index}`} index={index} data={element} onCheckItem={onCheckItem} onChangeClick={onChangeClick} onRemoveClick={onRemoveClick}/>)
	})

	return (<tbody>
		{rows}
	</tbody>)
})

export default SortableTable