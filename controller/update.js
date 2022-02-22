const studentService = require('../services/student')
const meetingService = require('../services/meetings');


/**
 * Check if the given id is Not Full
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const getPage = (req, res, next) => {
    res.render('update', { error: req.flash("error")});
}

/**
 * It hanldes Product Adding API
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
 const removeStudent = (req, res, next) => {
    
    console.log("Start");
    meetingService.removeStudent(req.body.email).then( response =>{
        console.log("Stage 4");
        studentService.unSubmit(req.body.email).then( response => {
            console.log("Stage 5");
            studentService.setUpdate(req.body.email).then( response => {
                console.log("Stage 6");
                req.flash('success', 'You can update now');
                res.redirect('/');
            }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
        }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}

module.exports = {
    getPage,
    removeStudent
}