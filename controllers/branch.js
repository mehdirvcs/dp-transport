const Branch = require('../models/Branch')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllBranches = async (req, res) => {
    const Branches = await Branch.find({})
    res.status(StatusCodes.OK).json({Branches, count: Branches.length})
}

const getBranch = async (req, res) => {
    const {
        params: { id: BranchId },
      } = req
    
      const Branch = await Branch.findOne({
        _id: BranchId,
      })
      if (!Branch) {
        throw new NotFoundError(`No Branch with id ${BranchId}`)
      }
      res.status(StatusCodes.OK).json({ Branch })
    }

const createBranch = async (req, res) => {
    const Branch = await Branch.create(req.body)
    res.status(StatusCodes.CREATED).json({Branch})
}

const updateBranch = async (req, res) => {
    const {
      body: { city, manager },
      params: { id: BranchId },
    } = req
  
    if (city === '' || manager === '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const Branch = await Branch.findByIdAndUpdate(
      { _id: BranchId},
      req.body,
      { new: true, runValidators: true }
    )
    if (!Branch) {
      throw new NotFoundError(`No Branch with id ${BranchId}`)
    }
    res.status(StatusCodes.OK).json({ Branch })
  }
  
  const deleteBranch = async (req, res) => {
    const {
      params: { id: BranchId },
    } = req
  
    const Branch = await Branch.findByIdAndRemove({
      _id: BranchId,
    })
    if (!Branch) {
      throw new NotFoundError(`No Branch with id ${BranchId}`)
    }
    res.status(StatusCodes.OK).send(`Deleted File with id ${BranchId}`)
  }
  

module.exports = {
    getAllBranches,
    getBranch,
    createBranch,
    updateBranch,
    deleteBranch
}