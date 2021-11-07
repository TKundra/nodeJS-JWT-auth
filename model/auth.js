import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {type: String, min: 6, max: 255, required: true},
    email: {type: String, min: 6, max: 255, required: true},
    password: {type: String, min: 6, max: 1024, required: true},
    date: {type: Date, default: Date.now},
});

export default mongoose.model('Users', userSchema);