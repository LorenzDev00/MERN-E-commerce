import mongoose from 'mongoose';

// Schema representing an application user (customer or admin)
const userSchema = new mongoose.Schema (
    {
        name: { type: String, required: true},
        surname: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true}, // stored as a bcrypt hash
        isAdmin: { type: Boolean, default: false, required: true}
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);
export default User;
