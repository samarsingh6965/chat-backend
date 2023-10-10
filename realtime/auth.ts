import jwt from "jsonwebtoken";
import {UserRealtimeModel} from '../Models';
import {ENV} from "../dotenv";
export default  async(socket:any, io:any)=>{
    const token = socket.handshake.headers.token;
    if (token) {
        try {
            socket.userInfo = jwt.verify(token, ENV.JWT_SECRET);
            let d = await UserRealtimeModel.findOneAndUpdate(
                {
                    userId:socket.userInfo.userId,
                },
                {
                    userId:socket.userInfo.userId,
                    connectionId:socket.id
                },
                {new:true,upsert: true }
            );
            // console.log("UserInfo:",socket.userInfo.userId, d);
        } catch (error:any) {
            console.error('Token verification error:', error.message);
            socket.disconnect(); // Reject the connection
        }
    } else {
        console.error('No token provided', socket.id);
        socket.disconnect(); // Reject the connection
    }
}