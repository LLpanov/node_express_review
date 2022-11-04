import * as mongoose from 'mongoose';
import { teacherModel } from './teacher';

const { Schema, model } = mongoose;

export interface IStudents{
    name: string;
    email: string;
    age: number;
    skill: string;
    teacher:any
}

const studentsSchema = new Schema<IStudents>({
    name: {
        type: String,
        trim: true,
        required: true,

    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true,

    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: teacherModel,
        default: null,

    },

    age: {
        type: Number,
        trim: true,

    },

    skill: {
        type: String,
        trim: true,
    },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

});

studentsSchema.virtual('fullName').get(function () {
    return `${this.name} Oktenweb `;
});

studentsSchema.pre('find', function () {
    this.populate('teacher');
});

export const studentModel = model('student', studentsSchema);
