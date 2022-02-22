var express = require('express');
var router = express.Router();

const updateController = require('../controller/update');
const validateController = require('../controller/validate')


/* GET home page. */
router.get('/', updateController.getPage);

router.post('/', validateController.isStudent, validateController.isUpdated, validateController.isNotSubmited,  updateController.removeStudent )

module.exports = router;
