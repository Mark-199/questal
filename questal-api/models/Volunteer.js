import mongoose from 'mongoose';

const volunteerSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    skills: {
        type: Array,
        required: true
    },
    availability: {
        type: Boolean,
        default: true,
    },
    barangay_assigned: {
        type: mongoose.Schema.ObjectId,
        ref: 'Barangay'
    },
}, {timestamps: true});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
export default Volunteer;