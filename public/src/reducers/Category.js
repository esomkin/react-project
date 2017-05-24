import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import * as constants from './../actions/Constants'

const load = (state = false, action) => {

	switch (action.type) {

		case constants.REQUEST_BEGIN:

			return true;

		case constants.REQUEST_END:

			return false;

		default:

			return state;
	}
}

const crumb = (state = [], action) => {

	switch (action.type) {

		case constants.CRUMB_RESET:

			return action.data;

		default:

			return state;
	}
}

const page = (state = { num: 0, per: 5 }, action) => {

	switch (action.type) {

		case constants.PAGE_NUM:

			return Object.assign({}, state, { num: action.num })

		case constants.PAGE_PER:

			return Object.assign({}, state, { per: action.per })

		default:

			return state
	}
}

const sort = (state = { order: 'DESC' }, action) => {

	switch (action.type) {

		case constants.SORT_ORDER:

			return Object.assign({}, state, { order: action.order })

		default:

			return state
	}
}

const filter = (state = { }, action) => {

	switch (action.type) {

		case constants.FILTER_OPTION:

			return action.fields

		default:

			return state
	}
}

const list = (state = { data: [], count: 0 }, action) => {

	switch (action.type) {

		case constants.LIST_ITEM_CHECK:

			return Object.assign({}, state, { data: state.data.map((element, index, list) => {

				if (element.id == action.id) {

					return Object.assign({}, element, { checked: !element.checked })
				}

				return element
			})})

		case constants.LIST_ITEM_CREATE: {

			if (!action.data.length) {

				return Object.assign({}, state, { count: state.count + 1 })
			}

			let data = state.data

			if (action.order == 'DESC') {

				data = state.data.sort((a, b) => {

					if (a.position > b.position) {

						return ((action.order == 'ASC') ? 1 : -1)
					}

					if (a.position < b.position) {

						return ((action.order == 'ASC') ? -1 : 1)
					}

					return 0
				})

				data.pop()
			}

			return { data: [

				...data,
				action.data[0]

			], count: state.count + 1 }
		}

		case constants.LIST_ITEM_UPDATE:

			return Object.assign({}, state, { data: state.data.map((element, index, list) => {

				if (element.id == action.data.id) {

					return Object.assign({}, element, action.data)
				}

				return element
			})})

		case constants.LIST_INSERT:

			return { data: [

				...state.data,
				...action.data

			], count: action.count }

		case constants.LIST_RESET:

			return { data: [

				...action.data

			], count: action.count}

		case constants.LIST_SWAP:

			let temp = Object.assign({}, state, { data: state.data.map((element, index, list) => {

				if (action.positionOld > action.position) {

					if ((element.position >= action.position)
						&& (element.position < action.positionOld)) {

						return Object.assign({}, element, { position: element.position + 1 })
					}

					return element
				}

				if (action.positionOld < action.position) {

					if ((element.position <= action.position)
						&& (element.position > action.positionOld)) {

						return Object.assign({}, element, { position: element.position - 1 })
					}

					return element
				}
			})})

			return Object.assign({}, temp, { data: temp.data.map((element, index, list) => {

				if (element.id == action.idOld) {

					return Object.assign({}, element, { position: action.position })
				}

				return element
			})})

		case constants.LIST_REMOVE:

			let data = Object.keys(state.data).reduce((previous, current, index, array) => {

				if (!(action.remove.indexOf(state.data[current].id) + 1)) {

					previous.push(state.data[current])	
				}

				return previous

			}, [])

			let count = state.count - action.remove.length + action.append.length;

			return { data: [

				...data,
				...action.append

			], count }

		case constants.LIST_CHECK:

			return Object.assign({}, state, { data: state.data.map((element, index, list) => {

				return Object.assign({}, element, { checked: action.check })
			})})

		default:

			return state
	}
}

const Reducers = combineReducers({

	load,
	crumb,
	page,
	sort,
	filter,
	list,
	form: reduxFormReducer
})

export default Reducers