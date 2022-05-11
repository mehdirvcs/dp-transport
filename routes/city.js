const express = require('express')
const router = express.Router()

const {getAllCities, getCity, createCity, updateCity, deleteCity} = require('../controllers/cities')

router.route('/').post(createCity).get(getAllCitys)
router.route('/:id').get(getCity).patch(updateCity).delete(deleteCity)

module.exports = router