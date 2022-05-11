const express = require('express')
const router = express.Router()

const {getAllBookings, getBooking, createBooking, updateBooking, deleteBooking} = require('../controllers/bookings')

router.route('/').post(createBooking).get(getAllBookings)
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking)

module.exports = router