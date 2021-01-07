const mongoose = require('mongoose');

const { Schema } = mongoose;
const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, 
    projectDate: {
        type: Date, 
        required: true, 
    },
    language: { 
        type: String, 
        required: false,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model('Project', projectSchema);