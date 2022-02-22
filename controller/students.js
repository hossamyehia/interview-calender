const studentService = require('../services/student');


const addMany = (req, res, next) => {

    studentService.addMany(req.body.students).then( students => {
        res.status(200).setHeader('Content-Type', 'application/json').json({success: true, status: "done"});
    }).catch( err => {res.status(500).setHeader('Content-Type', 'application/json').json({err: err});})

}

module.exports = {
    addMany
}