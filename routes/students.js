var express = require('express');
var router = express.Router();


const studentController = require('../controller/students')

router.post('/',  studentController.addMany)

module.exports = router;