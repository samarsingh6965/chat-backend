import jwt from "jsonwebtoken";
import { ENV } from "../dotenv";
import { Socket } from "socket.io";
import { UserRealtimeModel } from "../Models";
interface CustomSocket extends Socket {
    userInfo: {
        userId: string
    } | any;
}

export default async (socket: CustomSocket) => {
    const token: any = socket?.handshake?.headers?.token;
    if (token) {
        try {
            socket.userInfo = jwt.verify(token, ENV.JWT_SECRET);
            let d = await UserRealtimeModel.findOneAndUpdate(
                {
                    userId: socket.userInfo.userId,
                },
                {
                    userId: socket.userInfo.userId,
                    connectionId: socket.id
                },
                { new: true, upsert: true }
            );
            // console.log('Client Connected', d)
        } catch (error: any) {
            console.error('Token verification error:', error.message);
            socket.disconnect(); // Reject the connection
        }
    } else {
        console.error('No token provided', socket.id);
        socket.disconnect(); // Reject the connection
    }
    socket.on('disconnect', async () => {
        try {
            let d = await UserRealtimeModel.findOneAndUpdate(
                {
                    connectionId: socket.id,
                },
                {
                    status: false,
                    disconnectedAt: new Date(),
                    lastActiveAt: new Date()
                },
                { new: true }
            );
            // console.log(`Client disconnected: ${socket.id}`, d);
        } catch (error) {
            console.error("Exception[Disconnect]", error)
        }
    });
}