var express = require('express');
var router = express.Router();
const meetingService = require('../services/meetings');

/* GET users listing. */
router.get('/', function(req, res, next) {
  meetingService.getAll().then(meetings => {
    res.status(200).setHeader('Content-Type', 'application/json').json({meetings});
  })
});

router.post('/', function(req, res, next) {
  meetingService.add(req.body.title, req.body.day, req.body.hour).then(meetings => {
    res.status(200).setHeader('Content-Type', 'application/json').json({meetings});
  })
});

module.exports = router;
