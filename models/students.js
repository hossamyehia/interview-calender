const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    submited:{
        type: Boolean,
        default: false,
    },
    updated:{
        type: Boolean,
        default: false,
    },
});

let student = mongoose.model('student', studentSchema);

module.exports = student