const express = require('express')
const router = express.Router()

const {getAllQuotations, getQuotation, createQuotation, updateQuotation, deleteQuotation} = require('../controllers/quotations')

router.route('/').post(createQuotation).get(getAllQuotations)
router.route('/:id').get(getQuotation).patch(updateQuotation).delete(deleteQuotation)

module.exports = router