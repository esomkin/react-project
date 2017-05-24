import * as constants from './Constants'
import { SubmissionError, initialize, reset } from 'redux-form'
import './../third-party/animate.css/animate.min.css'
import './../third-party/bootstrap-notify/bootstrap-notify.min'
import SlippyPane from './../third-party/slippypane/build/slippypane.min'

import { Model, Collection } from './../classes/Sync'

const notify = (type, text) => {

	$.notify({

		message: text

	}, {

		newest_on_top: true,
		allow_dismiss: false,
		delay: 2000,
		timer: 1000,
		type,
		placement: {

			from: 'top',
			align: 'center'
		},
		offset: 0,
		animate: {

			enter: 'animated fadeIn',
			exit: 'animated fadeOut'
		}
	});	
}


export const requestBegin = () => {

	return {

		type: constants.REQUEST_BEGIN
	}
}

export const requestEnd = () => {

	return {

		type: constants.REQUEST_END
	}
}

export const crumbReset = (data) => {

	return {

		type: constants.CRUMB_RESET,
		data
	}
}

export const pageNum = (num) => {

	return {

		type: constants.PAGE_NUM,
		num
	}
}

export const fetchPageNum = () => {

	return (dispatch, getState) => {

		let state = getState()

		let crumb = state.crumb

		let page_num = state.page.num + 1
		let page_per = state.page.per
		let sort_order = state.sort.order
		let filter = state.filter

		dispatch(requestBegin())

		return Collection.read({ 

			url: 'http://localhost:8080/api/category', 
			params: { page_num, page_per, sort_order, filter } 

		}).then((json) => {

			dispatch(pageNum(page_num))
			dispatch(listInsert(json.data, json.count))

			if (!Object.keys(crumb).length) {
				
				dispatch(crumbReset(json.crumb))
			}

			dispatch(requestEnd())

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)
		})
	}
}

export const pagePer = (per) => {

	return {

		type: constants.PAGE_PER,
		per
	}
}

export const fetchPagePer = (per) => {

	return (dispatch, getState) => {

		let state = getState()

		let page_num = 1
		let page_per = per
		let sort_order = state.sort.order
		let filter = state.filter

		dispatch(requestBegin())

		return Collection.read({ 

			url: 'http://localhost:8080/api/category', 
			params: { page_num, page_per, sort_order, filter } 

		}).then((json) => {

			dispatch(pageNum(page_num))
			dispatch(pagePer(page_per))
			dispatch(listReset(json.data, json.count))
			dispatch(requestEnd())

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)
		}) 
	}
}

export const sortOrder = (order) => {

	return {

		type: constants.SORT_ORDER,
		order
	}
}

export const fetchSortOrder = (order) => {

	return (dispatch, getState) => {

		let state = getState()

		let page_num = state.page.num
		let page_per = state.page.per
		let sort_order = order
		let filter = state.filter

		dispatch(requestBegin())

		return Collection.read({ 

			url: 'http://localhost:8080/api/category', 
			params: { page_num, page_per, sort_order, filter } 

		}).then((json) => {

			dispatch(sortOrder(sort_order))
			dispatch(listReset(json.data, json.count))
			dispatch(requestEnd())

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)
		})
	}
}

export const filterOption = (fields) => {

	return {

		type: constants.FILTER_OPTION,
		fields
	}
}

export const fetchFilterOption = (fields = {}) => {

	return (dispatch, getState) => {

		let state = getState()

		let page_num = 1
		let page_per = state.page.per
		let sort_order = state.sort.order
		let filter = fields

		dispatch(requestBegin())

		return Collection.read({ 

			url: 'http://localhost:8080/api/category', 
			params: { page_num, page_per, sort_order, filter } 

		}).then((json) => {

			dispatch(pageNum(page_num))
			dispatch(filterOption(fields))
			dispatch(listReset(json.data, json.count))
			dispatch(requestEnd())
			SlippyPane('#form').close()

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)
		})
	}	
}

export const fetchListChange = (id) => {

	return (dispatch, getState) => {

		dispatch(requestBegin())

		return Model.read({ 

			url: 'http://localhost:8080/api/category'

		}, { id }).then((json) => {

			dispatch(initialize('create', json, false))
			SlippyPane('#form').open({ side: 'r', index: 1 })
			dispatch(requestEnd())

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)
		})
	}	
}

export const listCreate = (data, order) => {

	return {

		type: constants.LIST_ITEM_CREATE,
		data,
		order
	}
}

export const listUpdate = (data) => {

	return {

		type: constants.LIST_ITEM_UPDATE,
		data
	}
}

export const fetchListStore = (data) => {

	return (dispatch, getState) => {

		let id = data.id || null

		if (!id) {

			return dispatch(fetchListCreate(data))
		}

		return dispatch(fetchListUpdate(data))
	}
}

export const fetchListCreate = (data) => {

	return (dispatch, getState) => {

		let state = getState()

		let page_num = state.page.num
		let page_per = state.page.per
		let sort_order = state.sort.order
		let filter = state.filter

		dispatch(requestBegin())

		return Model.save({ 

			url: 'http://localhost:8080/api/category', 
			params: { page_num, page_per, sort_order, filter } 

		}, data).then((json) => {

			page_num = Math.ceil((state.list.data.length + 1) / page_per)

			dispatch(pageNum(page_num))
			dispatch(listCreate(json, sort_order))
			dispatch(reset('create'))				
			dispatch(requestEnd())

			SlippyPane('#form').close()

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)

			throw new SubmissionError(object.json)
		})
	}
}

export const fetchListUpdate = (data) => {

	return (dispatch, getState) => {

		dispatch(requestBegin())

		return Model.save({ 

			url: 'http://localhost:8080/api/category'

		}, data).then((json) => {

			dispatch(listUpdate(data))
			dispatch(reset('create'))
			dispatch(requestEnd())

			SlippyPane('#form').close()

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)

			throw new SubmissionError(object.json)
		})
	}
}

export const listSwap = (indexOld, index, idOld, id, positionOld, position) => {

	return {

		type: constants.LIST_SWAP,
		indexOld, 
		index,
		idOld,
		id,
		positionOld,
		position
	}
}

export const fetchListSwap = (indexOld, index) => {

	return (dispatch, getState) => {

		let state = getState()

		let page_num = state.page.num
		let page_per = state.page.per
		let sort_order = state.sort.order
		let filter = state.filter

		dispatch(requestBegin())

		return Collection.swap({ 

			url: [ 'http://localhost:8080/api/category', indexOld, index ].join('/'), 
			params: { page_num, page_per, sort_order, filter } 

		}).then((json) => {

			dispatch(listSwap(indexOld, index, json[0].id, json[1].id, json[0].position, json[1].position))
			dispatch(requestEnd())

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)
		})
	}
}

export const listRemove = (remove, append) => {

	return {

		type: constants.LIST_REMOVE,
		remove,
		append
	}
}

export const fetchListRemove = (check = []) => {

	return (dispatch, getState) => {

		let state = getState()

		if (!check.length) {

			check = Object.keys(state.list.data).reduce((previous, current, index, array) => {

				if (state.list.data[current].checked) {

					previous.push(state.list.data[current].id)	
				}

				return previous

			}, [])
		}

		if (!check.length) {

			return
		}

		let page_num = state.page.num
		let page_per = state.page.per
		let sort_order = state.sort.order
		let filter = state.filter

		dispatch(requestBegin())

		return Collection.destroy({ 

			url: 'http://localhost:8080/api/category', 
			params: { page_num, page_per, sort_order, filter } 

		}, check).then((json) => {

			page_num = Math.ceil((state.list.data.length - check.length + json.length) / page_per)

			dispatch(pageNum(page_num))
			dispatch(listRemove(check, json))
			dispatch(requestEnd())

		}).catch((object) => {

			dispatch(requestEnd())
			notify('danger', object.error.status + ', ' + object.error.text)
		})
	}
}

export const listItemCheck = (id) => {

	return {

		type: constants.LIST_ITEM_CHECK,
		id
	}
}

export const listReset = (data, count) => {

	return {

		type: constants.LIST_RESET,
		data,
		count
	}
}

export const listInsert = (data, count) => {

	return {

		type: constants.LIST_INSERT,
		data,
		count
	}
}

export const listCheck = (check) => {

	return {

		type: constants.LIST_CHECK,
		check
	}
}