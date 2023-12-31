import mongoose from 'mongoose';
export default (connection: any) => {
    const schema = new connection.Schema({
        profileImage: {
            type: String,
            default: null,
        },
        username: { type: String, required: true },
        name: { type: String, required: true },
        bio: { type: String, default: "Hey there! I'm using Chatsapp." },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'other'],
        },
        block_list: {
            type: [{
                type: mongoose.Types.ObjectId,
                ref: "User",
                require: false
            }],
            default: []
        },
        email: { type: String, required: true },
        password: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
        modified_at: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ['active', 'inactive', 'deleted'],
            default: 'active',
        },
    });
    const UserModel = connection.model('User', schema);
    return UserModel;
};