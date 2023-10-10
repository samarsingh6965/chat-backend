export default (connection:any)=>{
    return connection.model('UserRealtimeConnection', new connection.Schema({
        userId: String,
        connectionId:String,
        status: {type:Boolean, default:true},
        disconnectedAt:{type:Date, default:null},
        lastActiveAt:{type:Date, default:Date.now},
        firstConnectedAt: { type: Date, default: Date.now }
    }));
};