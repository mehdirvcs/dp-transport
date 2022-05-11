const Quotation = require('../models/Quotation')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllQuotations = async (req, res) => {
    const Quotations = await Quotation.find({})
    res.status(StatusCodes.OK).json({Quotations, count: Quotations.length})
}

const getQuotation = async (req, res) => {
    const {
        params: { id: QuotationId },
      } = req
    
      const Quotation = await Quotation.findOne({
        _id: QuotationId,
      })
      if (!Quotation) {
        throw new NotFoundError(`No Quotation with id ${QuotationId}`)
      }
      res.status(StatusCodes.OK).json({ Quotation })
    }

const createQuotation = async (req, res) => {
    const Quotation = await Quotation.create(req.body)
    res.status(StatusCodes.CREATED).json({Quotation})
}

const updateQuotation = async (req, res) => {
    const {
      body: { pickup_chargers, handling_charges, delivery_charges, transport_cost },
      user: { userId },
      params: { id: QuotationId },
    } = req
  
    if (pickup_chargers === '' || delivery_charges === '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const Quotation = await Quotation.findByIdAndUpdate(
      { _id: QuotationId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!Quotation) {
      throw new NotFoundError(`No Quotation with id ${QuotationId}`)
    }
    res.status(StatusCodes.OK).json({ Quotation })
  }
  
  const deleteQuotation = async (req, res) => {
    const {
      params: { id: QuotationId },
    } = req
  
    const Quotation = await Quotation.findByIdAndRemove({
      _id: QuotationId,
    })
    if (!Quotation) {
      throw new NotFoundError(`No Quotation with id ${QuotationId}`)
    }
    res.status(StatusCodes.OK).send(`Deleted File with id ${QuotationId}`)
  }
  

module.exports = {
    getAllQuotations,
    getQuotation,
    createQuotation,
    updateQuotation,
    deleteQuotation
}