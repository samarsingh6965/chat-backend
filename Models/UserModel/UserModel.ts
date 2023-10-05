import mongoose from 'mongoose';
import { Hooks } from '../../DB/hooks';
export default (connection: any) => {
    const schema =  new connection.Schema({
        profileImage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Media',
            default:null
        },
        username:{type: String, require: true },
        name: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        created_at: { type: Date, default: Date.now() },
        modified_at: { type: Date, default: Date.now() },
        status: {
            "type": "string",
            "enum": ["active", "inactive", "deleted"],
            default: 'active'
        }
    });
    Hooks.mediaRef(schema,'User', ['profileImage']);
    const UserModel = connection.model('User', schema);
    return UserModel;
};