const meetingService = require('../services/meetings');
const studentService = require('../services/student');

/**
 * Check if the given id is gate id
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
let isStudent = (req, res, next) => {
    studentService.get(req.body.email).then( (student) => {
        if(student){
            next();
        }else{
            req.flash("error", "Student Not Found");
            res.redirect('/');
        }
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
}

/**
 * Check if the given id is Cart id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const isNotFull = (req, res, next) => {
    
    meetingService.get(req.body.day, req.body.hour).then( (meeting) => {
        if(meeting.numberOfStudents <= 8){
            req.meeting = meeting; 
            next();
        }else{
            req.flash("error", "Time Is Full");
            res.redirect('/');
        }
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
}


module.exports = {
    isStudent,
    isNotFull,
}