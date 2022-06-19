import { mongoose } from 'mongoose';
import { useVirtualId } from '../db/database.js';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    url: String 
});

useVirtualId(userSchema, 'uid');
const User = mongoose.model('User', userSchema);

export async function findUserByUsername(username) {
    return User.findOne({ username });
}

export async function findUserById(uid) {
    return User.findById(uid);
}

export async function createUser(user) {
    return new User(user).save().then((data) => {
        data._id;
    });
}