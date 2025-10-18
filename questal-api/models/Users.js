// models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// This is our "blueprint" for a user.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name.'], // Makes this field mandatory.
    trim: true, // Removes any extra whitespace from the beginning or end.
  },
  email: {
    type: String,
    required: [true, 'An email is required.'],
    unique: true, // Ensures no two users can register with the same email.
    lowercase: true, // Converts email to lowercase before saving.
    match: [/.+\@.+\..+/, 'Please enter a valid email address.'], // Simple email validation.
  },
  password: {
    type: String,
    required: [true, 'A password is required.'],
    minlength: 8, // Enforces a minimum password length for security.
    select: false, // Prevents the password from being sent back in queries by default.
  },
  role: {
    type: String,
    enum: ['citizen', 'barangay_admin', 'volunteer', 'gov_admin'], // Restricts the role to only these values.
    default: 'citizen', // Sets a default role if none is provided.
  },
  barangay_id: {
    type: mongoose.Schema.ObjectId, // This is how we'll link a user to a Barangay.
    ref: 'Barangay', // Tells Mongoose this ID refers to a document in the 'Barangay' collection.
    required: true,
  },
  contact_number: {
    type: String,
    // We can add validation for Philippine phone numbers later.
  },
  // Mongoose automatically adds `createdAt` and `updatedAt` if we add `timestamps: true`.
}, { timestamps: true });

// --- Mongoose Middleware ---
// This is a "pre-save hook". It's a function that runs right before a user document is saved to the database.
// We use it to hash the password so we never store plaintext passwords. This is critical for security.
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with a cost factor of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});


// This creates the model from the schema and exports it.
const User = mongoose.model('User', userSchema);
export default User;