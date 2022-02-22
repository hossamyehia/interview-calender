const Meeting = require('../models/calender');

/**
 * Add Meeting
 * @param {String} day
 * @param {Number} Hour
 * @returns Promise "New Cart" || "Error"
 */
const add = (title, day, hour)=> {
    return new Promise((resolve, reject) => {

        Meeting.insertMany({title: title, day: day, hour: hour}).then((meeting) => {
            resolve(meeting);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * Get Meeting data
 * @param {String} day
 * @param {String} hour 
 * @returns Promise "Meeting data" || "Error"
 */
 const get = (day, hour) => {
    return new Promise((resolve, reject) => {

        Meeting.findOne({day: day, hour: hour}).then((meeting) => {
            resolve(meeting);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * get All Meetings data
 * @returns 
 */
const getAll = ()=>{
    return new Promise((resolve, reject) => {

        Meeting.aggregate([{$sort: {_id: 1}}, { $group : { _id : "$day", hours: { $push: "$$ROOT" } } }]).then((meetings) => {
            resolve(meetings);
        }).catch(err => {
            reject(err);
        });
        
    });
}
/**
 * Append the student to meeting
 * @param {String} day
 * @param {Number} our
 * @param {String} email
 * @returns Promise "Done msg" || "Error"
 */
const addStudent = (day, hour, email) => {
    return new Promise((resolve, reject) => {

        Meeting.updateOne({day: day,hour:hour},{$inc: {numberOfStudents: 1},$push: {students:email}}).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
        
    });
}
/**
 * remove Student from meeting
 * @param {String} email 
 * @returns Promise "Done msg" || "Error"
 */
const removeStudent = (email) => {
    return new Promise((resolve, reject) => {

        Meeting.updateOne({ students: { $in: [email] } },{$inc: {numberOfStudents: -1},$pull: {students:email}}).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
        
    });
}


module.exports = {
    add,
    get,
    getAll,
    addStudent,
    removeStudent
}