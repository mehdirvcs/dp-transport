const express = require('express')
const router = express.Router()

const {getAllEnquiries, getEnquiry, createEnquiry, updateEnquiry, deleteEnquiry} = require('../controllers/enquiries')

router.route('/').post(createEnquiry).get(getAllEnquirys)
router.route('/:id').get(getEnquiry).patch(updateEnquiry).delete(deleteEnquiry)

module.exports = router