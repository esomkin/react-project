const express = require('express')
const router = express.Router()
const route_category = require('./category')

router.use('/category', route_category)

module.exports = router