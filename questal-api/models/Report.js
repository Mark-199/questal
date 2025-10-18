import mongoose from "mongoose";

// This is our "blueprint" for a report.
const reportSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    barangay_id: {
        type: mongoose.Schema.ObjectId,
        ref:"Barangay",
        required: true,
    },
    title: {
        type: String,
        required: [true, 'A title is required.'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters.']
    },
    description: {
        type: String,
        required: [true, 'A description is required.']
    },
    photo_url: {
        type: String,
    },
    location: {
        type: {type:String, enum: ['Point'], required: true},
        coordinates: {type:[Number], required: true},
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'escalated', 'resolved'],
        required: true,
        default: 'pending',
    },
    
}, {timestamps: true});

const Report = mongoose.model('Report', reportSchema);
export default Report;