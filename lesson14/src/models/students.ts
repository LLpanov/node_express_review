import * as mongoose from 'mongoose';

const { Schema, model } = mongoose;

const studentsSchema = new Schema({
    name: {
        type: String,
        trim: true,

    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,

    },

    age: {
        type: Number,
        trim: true,

    },

    skill: {
        type: String,
        trim: true,
    },

});
export const studentModel = model('student', studentsSchema);
