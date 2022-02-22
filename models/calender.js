const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meetingsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    day:{
        type: String,
        required: true
    },
    hour:{
        type: String,
        required: true
    },
    numberOfStudents:{
        type: Number,
        default: 0,
        max: 8
    },
    students:[{
        type: String
    }]
});

let meetings = mongoose.model('meetings', meetingsSchema);

module.exports = meetings