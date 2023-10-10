export default (connection:any)=>{
    return connection.model('Message', new connection.Schema({
        from: {type:String,require:true},
        to:{type:String,require:true},
        message: {type:String,require:true},
        timestamp: { type: Date, default: Date.now },
    }));
};