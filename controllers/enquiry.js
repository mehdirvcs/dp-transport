const Enquiry = require('../models/Enquiry')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllEnquiries = async (req, res) => {
    const Enquiries = await Enquiry.find({})
    res.status(StatusCodes.OK).json({Enquiries, count: Enquiries.length})
}

const getEnquiry = async (req, res) => {
    const {
        params: { id: EnquiryId },
      } = req
    
      const Enquiry = await Enquiry.findOne({
        _id: EnquiryId,
      })
      if (!Enquiry) {
        throw new NotFoundError(`No Enquiry with id ${EnquiryId}`)
      }
      res.status(StatusCodes.OK).json({ Enquiry })
    }

const createEnquiry = async (req, res) => {
    const Enquiry = await Enquiry.create(req.body)
    res.status(StatusCodes.CREATED).json({Enquiry})
}

const updateEnquiry = async (req, res) => {
    const {
      body: { pickup_date, weight, weight_type },
      params: { id: EnquiryId },
    } = req
  
    if (weight === '' || weight === '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const Enquiry = await Enquiry.findByIdAndUpdate(
      { _id: EnquiryId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!Enquiry) {
      throw new NotFoundError(`No Enquiry with id ${EnquiryId}`)
    }
    res.status(StatusCodes.OK).json({ Enquiry })
  }
  
  const deleteEnquiry = async (req, res) => {
    const {
      params: { id: EnquiryId },
    } = req
  
    const Enquiry = await Enquiry.findByIdAndRemove({
      _id: EnquiryId,
    })
    if (!Enquiry) {
      throw new NotFoundError(`No Enquiry with id ${EnquiryId}`)
    }
    res.status(StatusCodes.OK).send(`Deleted File with id ${EnquiryId}`)
  }
  

module.exports = {
    getAllEnquiries,
    getEnquiry,
    createEnquiry,
    updateEnquiry,
    deleteEnquiry
}