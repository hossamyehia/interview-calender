const studentService = require('../services/student')
const meetingService = require('../services/meetings');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getData = (req, res, next) => {

    meetingService.getAll().then( data =>{
        let step = {};
        let color = ["zero","one","two","three","four","five","six","seven","eight","nine","ten"];
        data.forEach(day => {
            step[day._id] = {};
            day.hours.forEach( hour => { 
                step[day._id][hour.hour.toString()] = [color[hour.numberOfStudents]]
                if(hour.numberOfStudents != 10){
                    step[day._id][hour.hour.toString()].push(color[hour.numberOfStudents + 1]);
                }
            });
        });
        res.render('index', { data: data,color: color, success: req.flash('success'),error: req.flash("error"), step: step, title: 'Calender' });
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}


/**
 * It hanldes Product Adding API
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Callback Function} next 
 */
 const addStudent = (req, res, next) => {
    
    let student = {
        name: req.body.name,
        email: req.body.email
    }

    let time = {
        day:req.body.day,
        hour:req.body.hour
    }
    meetingService.addStudent(time, student).then( response =>{
        studentService.setSubmit(req.body.email).then( response => {
            req.flash('success', 'Submited successfully');
            res.redirect('/');
        }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}

module.exports = {
    getData,
    addStudent
}