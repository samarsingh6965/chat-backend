import jwt from "jsonwebtoken";
import {UserRealtimeConnection} from '../Models';
import {ENV} from "../dotenv";
export default  async(socket:any, io:any)=>{
    const token = socket.handshake.headers.token;
    if (token) {
        try {
            socket.userInfo = await jwt.verify(token, ENV.JWT_SECRET);
            let d = await UserRealtimeConnection.findOneAndUpdate(
                {
                    userId:socket.userInfo.id,
                },
                {
                    userId:socket.userInfo.id,
                    connectionId:socket.id
                },
                {new:true,upsert: true }
            );
            // console.log("UserInfo:",socket.userInfo.id, d);
        } catch (error:any) {
            console.error('Token verification error:', error.message);
            socket.disconnect(); // Reject the connection
        }
    } else {
        console.error('No token provided', socket.id);
        socket.disconnect(); // Reject the connection
    }
}