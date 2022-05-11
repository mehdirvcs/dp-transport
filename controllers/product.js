const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllProducts = async (req, res) => {
    const Products = await Product.find({})
    res.status(StatusCodes.OK).json({Products, count: Products.length})
}

const getProduct = async (req, res) => {
    const {
        params: { id: ProductId },
      } = req
    
      const Product = await Product.findOne({
        _id: ProductId,
      })
      if (!Product) {
        throw new NotFoundError(`No Product with id ${ProductId}`)
      }
      res.status(StatusCodes.OK).json({ Product })
    }

const createProduct = async (req, res) => {
    const Product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({Product})
}

const updateProduct = async (req, res) => {
    const {
      body: { hsncode, price },
      params: { id: ProductId },
    } = req
  
    if (hsncode === '' || price === '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const Product = await Product.findByIdAndUpdate(
      { _id: ProductId},
      req.body,
      { new: true, runValidators: true }
    )
    if (!Product) {
      throw new NotFoundError(`No Product with id ${ProductId}`)
    }
    res.status(StatusCodes.OK).json({ Product })
  }
  
  const deleteProduct = async (req, res) => {
    const {
      params: { id: ProductId },
    } = req
  
    const Product = await Product.findByIdAndRemove({
      _id: ProductId,
    })
    if (!Product) {
      throw new NotFoundError(`No Product with id ${ProductId}`)
    }
    res.status(StatusCodes.OK).send(`Deleted File with id ${ProductId}`)
  }
  

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}