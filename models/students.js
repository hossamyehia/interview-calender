const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
});

let student = mongoose.model('student', studentSchema);

module.exports = student