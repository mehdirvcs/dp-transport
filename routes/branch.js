const express = require('express')
const router = express.Router()

const {getAllBranches, getBranch, createBranch, updateBranch, deleteBranch} = require('../controllers/branches')

router.route('/').post(createBranch).get(getAllBranchs)
router.route('/:id').get(getBranch).patch(updateBranch).delete(deleteBranch)

module.exports = router