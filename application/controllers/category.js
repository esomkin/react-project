const express = require('express')
const router = express.Router()
const models = require('./../../db/models')

const queryData = (query, filterAllow = []) => {

	let page_num = 1
	let page_per = 5
	let sort_order = 'DESC'
	let filter = {}

	if (query.page_num) {

		page_num = Number(query.page_num)
	}

	if (query.page_per) {

		page_per = Number(query.page_per)

		if (!([5, 10].indexOf(page_per) + 1)) {

			page_per = 5
		}
	}

	if (query.sort_order) {

		sort_order = query.sort_order

		if (!(['DESC', 'ASC'].indexOf(sort_order) + 1)) {

			sort_order = 'DESC'
		}
	}

	filter = Object.keys(query).reduce((previous, current, index, array) => {

		if (current.indexOf('filter_') + 1) {

			let index = current.replace('filter_', '')

			if (filterAllow.indexOf(index) + 1) {

				previous[index] = query[current]
			}
		}

		return previous

	}, {})

	return {

		page_num,
		page_per,
		sort_order,
		filter
	}
}


router.get('/', (request, response) => {

	let { page_num, page_per, sort_order, filter } = queryData(request.query, ['text'])
	let sequelize = models.sequelize

	models.category.findAndCountAll({

		attributes: { include: [[sequelize.literal('false'), 'checked']] },
		where: {

			text: {

				$like: ['%', filter['text'], '%']. join('')
			}
		},
		order: [['position', sort_order]], 
		offset: ((page_num - 1) * page_per), 
		limit: page_per

	}).then((result) => {

		response.status(200).json({

			data: result.rows,
			crumb: [{

				url: '/',
				text: 'Home'

			}, {

				url: '/category',
				text: 'Category'
			}],
			count: result.count
		})

	}).catch((error) => {

		response.status(422).json(error)
	})
})


router.get('/:id', (request, response) => {

	let id = null

	if (request.params.id) {

		id = Number(request.params.id)
	}


	models.category.findById(id).then((result) => {

		response.status(200).json(result)

	}).catch((error) => {

		response.status(422).json(error)
	})	
})


router.post('/', (request, response) => {

	let data = {}
	let dataAllow = [

		'text'
	]

	if (request.body.data) {

		data = Object.keys(request.body.data).reduce((previous, current, index, array) => {

			if (dataAllow.indexOf(current) + 1) {

				previous[current] = request.body.data[current]
			}

			return previous

		}, {})
	}


	let validate = {}

	if (!data.text.length) {

		validate.text = 'Required'
	}

	if (Object.keys(validate).length) {

		response.status(422).json(validate)

		return
	}


	let { page_num, page_per, sort_order, filter } = queryData(request.query, ['text'])
	let sequelize = models.sequelize

	sequelize.transaction((transaction) => {

		return models.category.create(data, { 

			fields: ['text'], 
			transaction 

		}).then((result) => {

			return result.update({ position: result.id }, { 

				transaction 

			}).then((result) => {

				let id = result.id

				return models.category.findAll({

					attributes: { include: [[sequelize.literal('false'), 'checked']] },
					where: {

						text: {

							$like: ['%', filter['text'], '%']. join('')
						}
					},
					order: [['position', sort_order]], 
					offset: 0, 
					limit: (page_num * page_per),
					transaction

				}).then((result) => {

					result = result.filter((element, index, list) => {

						if (element.id == id) {

							return element
						}

						return false
					})

					return new Promise((resolve) => resolve(result))
				})
			})
		})

	}).then((result) => {

		response.status(201).json(result)	

	}).catch((error) => {

		response.status(422).json(error)
	})
})


router.put('/:id', (request, response) => {

	let id = null

	if (request.params.id) {

		id = Number(request.params.id)
	}


	let data = {}
	let dataAllow = [

		'text'
	]

	if (request.body.data) {

		data = Object.keys(request.body.data).reduce((previous, current, index, array) => {

			if (dataAllow.indexOf(current) + 1) {

				previous[current] = request.body.data[current]
			}

			return previous

		}, {})
	}


	let validate = {}

	if (!data.text.length) {

		validate.text = 'Required'
	}

	if (Object.keys(validate).length) {

		response.status(422).json(validate)

		return
	}


	models.category.update(data, {

		fields: ['text'],
		where: {

			id
		}

	}).then((result) => {

		response.status(200).json(null)

	}).catch((error) => {

		response.status(422).json(error)	
	})
})


router.delete('/', (request, response) => {

	let check = []

	if (request.body.data
		&& request.body.data.check) {

		check = request.body.data.check
	}

	if (!check.length) {

		response.status(422).send()
		return
	}


	let { page_num, page_per, sort_order, filter } = queryData(request.query, ['text'])
	let sequelize = models.sequelize

	sequelize.transaction((transaction) => {

		return models.category.findAll({

			attributes: { include: [[sequelize.literal('false'), 'checked']] },
			order: [['position', sort_order]], 
			offset: (page_num * page_per), 
			limit: check.length,
			transaction

		}).then((result) => {

			let append = result

			return models.category.destroy({ 

				where: { 

					id: {

						$in: check
					} 
				} 

			}).then((result) => {

				return new Promise((resolve) => resolve(append))
			})
		})

	}).then((result) => {

		response.status(200).json(result)

	}).catch((error) => {

		response.status(401).json(error)
	})
})


router.post('/:indexOld/:index', (request, response) => {

	let indexOld = null
	let index = null

	if (request.params.indexOld) {

		indexOld = Number(request.params.indexOld)
	}

	if (request.params.index) {

		index = Number(request.params.index)
	}


	let { page_num, page_per, sort_order, filter } = queryData(request.query, ['text'])
	let sequelize = models.sequelize

	sequelize.transaction((transaction) => {	

		return Promise.all([

			models.category.findOne({ order: [['position', sort_order]], offset: indexOld, limit: 1, transaction }),
			models.category.findOne({ order: [['position', sort_order]], offset: index, limit: 1, transaction })

		]).then((result) => {

			let dataOld = result[0]
			let data = result[1]

			if (dataOld.position > data.position) {

				return models.category.update({

					position: sequelize.literal('position + 1')

				}, {

					where: {

						position: {

							$and: {

								$gte: data.position,
								$lt: dataOld.position
							}
						}
					},
					transaction

				}).then((result) => {

					return models.category.update({

						position: data.position

					}, {

						where: {

							id: dataOld.id
						},
						transaction	

					}).then((result) => {

						return new Promise((resolve) => resolve([{

							id: dataOld.id,
							position: dataOld.position

						}, {

							id: data.id,
							position: data.position
						}]))
					})
				})
			}

			if (dataOld.position < data.position) {

				return models.category.update({

					position: sequelize.literal('position - 1')

				}, {

					where: {

						position: {

							$and: {

								$lte: data.position,
								$gt: dataOld.position
							}
						}
					},
					transaction

				}).then((result) => {

					return models.category.update({

						position: data.position

					}, {

						where: {

							id: dataOld.id
						},
						transaction	

					}).then((result) => {

						return new Promise((resolve) => resolve([{

							id: dataOld.id,
							position: dataOld.position

						}, {

							id: data.id,
							position: data.position
						}]))
					})
				})
			}
		})

	}).then((result) => {

		// Transaction has been committed
		// result is whatever the result of the promise chain returned to the transaction callback

		response.status(200).json(result)

	}).catch((error) => {

		// Transaction has been rolled back
		// error is whatever rejected the promise chain returned to the transaction callback

		response.status(422).json(error)
	})
})


module.exports = router