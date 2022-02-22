var express = require('express');
var router = express.Router();

const indexController = require('../controller/index');
const validateController = require('../controller/validate')


/* GET home page. */
router.get('/', indexController.getData);

router.post('/', validateController.isStudent, validateController.isNotFull, indexController.addStudent )

module.exports = router;
