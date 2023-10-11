import mongoose from "mongoose";

export default (connection:any)=>{
    return connection.model('Message', new connection.Schema({
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
        message: {type:String,require:true},
        timestamp: { type: Date, default: Date.now },
    }));
};