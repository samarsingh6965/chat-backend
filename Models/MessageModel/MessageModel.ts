import mongoose from "mongoose";

export default (connection:any)=>{
    return connection.model('Message', new connection.Schema({
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null
        },
        to:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null
        },
        message: {type:String,require:true},
        timestamp: { type: Date, default: Date.now },
    }));
};