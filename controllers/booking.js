const Booking = require('../models/Booking')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllBookings = async (req, res) => {
    const Bookings = await Booking.find({consignor: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({Bookings, count: Bookings.length})
}

const getBooking = async (req, res) => {
    const {
        user: { userId },
        params: { id: BookingId },
      } = req
    
      const Booking = await Booking.findOne({
        _id: BookingId,
        consigner: userId,
      })
      if (!Booking) {
        throw new NotFoundError(`No Booking with id ${BookingId}`)
      }
      res.status(StatusCodes.OK).json({ Booking })
    }

const createBooking = async (req, res) => {
    req.body.consigner = req.user.userId
    const Booking = await Booking.create(req.body)
    res.status(StatusCodes.CREATED).json({Booking})
}

const updateBooking = async (req, res) => {
    const {
      body: { additional_charge, payment_status, payment_type, booking_status },
      user: { userId },
      params: { id: BookingId },
    } = req
  
    if (payment_type === '' || additional_charge === '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const Booking = await Booking.findByIdAndUpdate(
      { _id: BookingId, consignor: userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!Booking) {
      throw new NotFoundError(`No Booking with id ${BookingId}`)
    }
    res.status(StatusCodes.OK).json({ Booking })
  }
  
  const deleteBooking = async (req, res) => {
    const {
      user: { userId },
      params: { id: BookingId },
    } = req
  
    const Booking = await Booking.findByIdAndRemove({
      _id: BookingId,
      consigner: userId,
    })
    if (!Booking) {
      throw new NotFoundError(`No Booking with id ${BookingId}`)
    }
    res.status(StatusCodes.OK).send(`Deleted File with id ${BookingId}`)
  }
  

module.exports = {
    getAllBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
}