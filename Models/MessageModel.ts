export default (connection:any)=>{
    return connection.model('Message', new connection.Schema({
        from: Number,
        to:Number,
        message: String,
        timestamp: { type: Date, default: Date.now },
    }));
};