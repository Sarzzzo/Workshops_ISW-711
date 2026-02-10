const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    credits: {
        required: true,
        type: Number
    }
});

module.exports = mongoose.model('courses', courseSchema);
