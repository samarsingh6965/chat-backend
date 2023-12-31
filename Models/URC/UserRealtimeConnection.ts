import mongoose from "mongoose";

export default (connection:any)=>{
    return connection.model('UserRealtimeConnection', new connection.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default:null
        },
        connectionId:String,
        activeChat:{type:String,default:null},
        status: {type:Boolean, default:true},
        disconnectedAt:{type:Date, default:null},
        lastActiveAt:{type:Date, default:Date.now},
        firstConnectedAt: { type: Date, default: Date.now }
    }));
};