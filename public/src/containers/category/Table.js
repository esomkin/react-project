import { connect } from 'react-redux'
import Table from './../../components/category/Table'
import { listItemCheck, listCheck, fetchListSwap, fetchListChange, fetchListRemove } from './../../actions/Category'

const sortedList = (list, order) => {

	return list.sort((a, b) => {

		if (a.position > b.position) {

			return ((order == 'ASC') ? 1 : -1)
		}

		if (a.position < b.position) {

			return ((order == 'ASC') ? -1 : 1);
		}

		return 0
	})
}

const mapStateToProps = (state) => {

	return {

		list: sortedList(state.list.data, state.sort.order)
	}
}

const mapDispatchToProps = (dispatch) => {

	return {

		onCheckItem: (id) => {

			dispatch(listItemCheck(id))
		},
		onCheckAll: (check) => {

			dispatch(listCheck(check))
		},
		onListSwap: (indexOld, index) => {

			dispatch(fetchListSwap(indexOld, index))
		},
		onChangeClick: (id) => {

			dispatch(fetchListChange(id))
		},
		onRemoveClick: (id) => {

			dispatch(fetchListRemove([id]))
		}
	}
}

const TableContainer = connect(

	mapStateToProps,
	mapDispatchToProps

) (Table)

export default TableContainer