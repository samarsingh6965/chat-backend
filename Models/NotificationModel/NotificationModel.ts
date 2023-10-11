import mongoose from "mongoose";

export default (connection:any)=>{
    return connection.model('Notification', new connection.Schema({
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require:true        
        },
        to:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require:true 
        },
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            require:true 
        },
        seen: {type:String,default:false},
        timestamp: { type: Date, default: Date.now },
    }));
};