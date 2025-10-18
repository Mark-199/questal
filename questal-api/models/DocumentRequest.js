import mongoose from 'mongoose';

const documentReqSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    barangay_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Barangay",
        required: true,
    },
    document_type: {
        type: String,
        enum: ['clearance', 'permit', 'ID', 'certificate_of_residency', 'other'],
        required: true
    },
    status: {
        type: String,
        enum: ['processing', 'approved', 'rejected'],
        default: 'processing',
        required: true
    },
}, {timestamps: true});

const DocumentRequest = mongoose.model('DocumentRequest', documentReqSchema);
export default DocumentRequest;