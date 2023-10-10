import {UserRealtimeModel} from '../Models/index';
import { Server } from "socket.io";
import auth from './auth';
import chat from './chat/chat';
import activeChat from './chat/activeChat';
export default async(server:any)=>{
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000"],
        }
    });
    io.on('connection', async(socket: any) => {
        auth(socket, io);
        chat(socket, io);
        activeChat(socket, io);
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