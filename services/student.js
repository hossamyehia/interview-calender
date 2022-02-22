const Student = require('../models/students');

/**
 * Add Students
 * @param {String} email
 * @returns Promise "students" || "Error"
 */
const addMany = (array)=> {
    return new Promise((resolve, reject) => {

        Student.insertMany(array,{ordered:false}).then((student) => {
            resolve(student);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * Get Student data
 * @param {String} email Cart email
 * @returns Promise "students data" || "Error"
 */
 const get = (email) => {
    return new Promise((resolve, reject) => {

        Student.findOne({email: email}).then((student) => {
            resolve(student);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * get All students data
 * @returns 
 */
const getAll = ()=>{
    return new Promise((resolve, reject) => {

        Student.find().then((students) => {
            resolve(students);
        }).catch(err => {
            reject(err);
        });
        
    });
}


module.exports = {
    addMany,
    get,
    getAll
}