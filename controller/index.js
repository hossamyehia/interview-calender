const { json } = require('express/lib/response');
const { response } = require('../app');
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
        let color = ["zero","one","two","three","four","five","six","seven","eight"];
        data.forEach(day => {
            step[day._id] = {};
            day.hours.forEach( hour => { 
                step[day._id][hour.hour.toString()] = [color[hour.numberOfStudents]]
                if(hour.numberOfStudents != 8){
                    step[day._id][hour.hour.toString()].push(color[hour.numberOfStudents + 1]);
                }
            });
        });
        res.render('index', { data: data,error: req.flash("error"), step: step, title: 'Calender' });
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
    
    meetingService.addStudent(req.body.day, req.body.hour, req.body.email).then( response =>{
        res.render('success')
    }).catch(err => res.status(500).setHeader('Content-Type', 'application/json').json({err: err}));
   
}




module.exports = {
    getData,
    addStudent
}