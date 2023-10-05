import mongoose from 'mongoose';
export default (connection: any) => {
    return connection.model('MediaRef', new connection.Schema({
        media:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Media',
            default:null
        },
        ref_id:{
            type: mongoose.Schema.Types.ObjectId,
            default:null
        },
        ref:{
            type: String,
            default:null
        },
        created_at: { type: Date, default: Date.now()},
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        modified_at: { type: Date, default: Date.now()},
        modified_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        status: {
            "type": "string",
            "enum": ["active", "inactive", "deleted"],
            default:'active'
        }
    }));
};