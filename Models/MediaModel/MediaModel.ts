import mongoose from 'mongoose';

export default (connection: any) => {
    return connection.model('Media', new connection.Schema({
        url: {type:String,require:true},
        mimetype:{type:String,require:true},
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
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