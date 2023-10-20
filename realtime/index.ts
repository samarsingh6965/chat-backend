import {UserRealtimeModel} from '../Models/index';
import { Server } from "socket.io";
import auth from './auth';
import {ENV} from "../dotenv";
import chat from './chat/chat';
export default async(server:any)=>{
    const io = new Server(server, {
        cors: {
            origin: [ENV.APP_SOCKET_CORS_URL],
        }
    });
    io.on('connection', async(socket: any) => {
        auth(socket, io);
        chat(socket, io);
        socket.on('disconnect', async() => {
            try {
                let d = await UserRealtimeModel.findOneAndUpdate(
                    {
                        connectionId:socket.id,
                    },
                    {
                        status:false,
                        disconnectedAt:new Date(),
                        lastActiveAt:new Date()
                    },
                    {new:true}
                );
                // console.log(`Client disconnected: ${socket.id}`, d);
            } catch (error) {
                console.error("Exception[Disconnect]",error)
            }
            // Perform any cleanup or tasks needed when a client disconnects
        });
    });
}