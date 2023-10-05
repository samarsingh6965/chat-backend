import mongoose from 'mongoose';

export default (connection:any)=>{
    return connection.model('UserRealtimeConnection', new connection.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        connectionId:String,
        status: {type:Boolean, default:true},
        disconnectedAt:{type:Date, default:null},
        lastActiveAt:{type:Date, default:Date.now},
        firstConnectedAt: { type: Date, default: Date.now }
    }));
};