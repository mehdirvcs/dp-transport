const City = require('../models/City')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllCities = async (req, res) => {
    const Cities = await City.find({})
    res.status(StatusCodes.OK).json({Cities, count: Cities.length})
}

const getCity = async (req, res) => {
    const {
        params: { id: CityId },
      } = req
    
      const City = await City.findOne({
        _id: CityId,
      })
      if (!City) {
        throw new NotFoundError(`No City with id ${CityId}`)
      }
      res.status(StatusCodes.OK).json({ City })
    }

const createCity = async (req, res) => {
    const City = await City.create(req.body)
    res.status(StatusCodes.CREATED).json({City})
}

const updateCity = async (req, res) => {
    const {
      body: { name, state, pincode, rateFactor },
      params: { id: CityId },
    } = req
  
    if (state === '' || pincode === '') {
      throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const City = await City.findByIdAndUpdate(
      { _id: CityId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!City) {
      throw new NotFoundError(`No City with id ${CityId}`)
    }
    res.status(StatusCodes.OK).json({ City })
  }
  
  const deleteCity = async (req, res) => {
    const {
      params: { id: CityId },
    } = req
  
    const City = await City.findByIdAndRemove({
      _id: CityId,
    })
    if (!City) {
      throw new NotFoundError(`No City with id ${CityId}`)
    }
    res.status(StatusCodes.OK).send(`Deleted File with id ${CityId}`)
  }
  

module.exports = {
    getAllCities,
    getCity,
    createCity,
    updateCity,
    deleteCity
}