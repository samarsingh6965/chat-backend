import { Server } from "socket.io";
import { UserRealtimeModel } from '../Models/index';
import auth from './auth';
export default async (server: any) => {
    const io = await new Server(server, {
        cors: {
            origin: ["http://localhost:3000"],
        }
    });
    io.on('connection', async (socket: any) => {
        auth(socket, io);
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
                console.log(`Client disconnected: ${socket.id}`, d);
            } catch (error) {
                console.error("Exception[Disconnect]", error)
            }
        });
    });
    return io;
}