import mongoose from 'mongoose';
import { Hooks } from '../../DB/hooks';
export default (connection: any) => {
    const schema = new connection.Schema({
        profileImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Media',
            default: null,
        },
        username: { type: String, required: true },
        name: { type: String, required: true },
        bio: { type: String, default:"Hey there! I'm using Chatsapp." },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'other'],
        },
        email: { type: String, required: true },
        password: { type: String, required: true },
        created_at: { type: Date, default: Date.now() },
        modified_at: { type: Date, default: Date.now() },
        status: {
            type: String,
            enum: ['active', 'inactive', 'deleted'],
            default: 'active',
        },
    });
    Hooks.mediaRef(schema, 'User', ['profileImage']);
    const UserModel = connection.model('User', schema);
    return UserModel;
};