import mongoose from 'mongoose';

const TransparenyProjectSchema = mongoose.Schema({
    barangay_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Barangay',
        name: String,
        required: true,
    },
    title: {
        type:String,
        required: true,
        maxlength: [150, 'Title cannot be more than 150 characters.'],
    },
    budget: {
        type: Number,
        required: true,
        min: [0, 'Budget cannot be negative.']
    },
    progress: {
        type: Number,
        default: 0,
        min: [0, 'Progress cannot be less than 0.'],
        max: [100, 'Progress cannot be more than 0.'],
    }, 
    description: {
        type:String,
        required:[true, 'Description is required.']
    },
}, {timestamps: true});

const TransparancyProject = mongoose.model('TransparancyProject', TransparenyProjectSchema);
export default TransparancyProject;