const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }, 
    book: {
        type: String,
        required: true
    },
    workbook: {
        type: String,
        required: true
    },
    novel: {
        type: String,
        required: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher' // Referencia a otra entidad
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
