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

/**
 * Update to submit
 * @param {String} email 
 * @returns 
 */
const setSubmit = (email)=>{
    return new Promise((resolve, reject) => {

        Student.updateOne({email:email},{$set: {submited: true}}).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * Update to submit
 * @param {String} email 
 * @returns 
 */
 const unSubmit = (email)=>{
    return new Promise((resolve, reject) => {

        Student.updateOne({email:email},{$set: {submited: false}}).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
        
    });
}

/**
 * 
 * @param {*} email 
 * @returns 
 */
const setUpdate = (email)=>{
    return new Promise((resolve, reject) => {

        Student.updateOne({email:email},{$set: {updated: true}}).then((res) => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
        
    });
}

module.exports = {
    addMany,
    get,
    getAll,
    setSubmit,
    unSubmit,
    setUpdate
}