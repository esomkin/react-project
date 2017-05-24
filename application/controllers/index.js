const express = require('express')
const router = express.Router()
const route_api = require('./api')

router.get('/', (request, response) => {

	response.render('index', { 

		title: 'Title'
	})
})

router.use('/api', route_api)

module.exports = router