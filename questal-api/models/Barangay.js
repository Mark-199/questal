import mongoose from 'mongoose';

// This is our "blueprint" for a barangay.
const barangaySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide a name of Barangay."]
    },
    region: {
        type: String,
        required: [true, "Please provide the Region."]
    },
    contact_email: {
        type: String,
        required: [true, "A contact email address is required."],
        match: [/.+\@.+\..+/, 'Please enter a valid email address.'], 
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        minlength: 12,
        required: [true, "A contact phone number is required."]
    },
    officials: {
        name: {type: String, required: true},
        postion: {type: String, required: true},
    },
    joined_date: {
        type: Date,
        default: Date.now,
    }, 
}, {timestamps: true});

const Barangay = mongoose.model('Barangay', barangaySchema);
export default Barangay;