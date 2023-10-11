import mongoose from 'mongoose';
import { UserRealtimeModel, MessageModel, NotificationModel } from '../../Models';
export default (socket: any, io: any) => {
    socket.on('typing', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 });
        if (userto) {
            io.to(userto.connectionId).emit('typing', data);
        }
        // console.log('typing', data, userto,userfrom);
    })
    socket.on('stop_typing', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 });
        if (userto) {
            io.to(userto.connectionId).emit('stop_typing', socket.userInfo._id);
        }
        // console.log('stop_typing', data, userto,userfrom);
    })
    socket.on('message', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 });
        if (userto) {
            let d = await new MessageModel(data).save();
            io.to(userto.connectionId).emit('message', d);
        }
    })
    socket.on('notification', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 });
        if (userto) {
            let d = await NotificationModel.findOneAndUpdate(
                {
                    from:data.from,
                    to:data.from,
                },
                {
                    lastMessage:data._id,
                },
                {new:true,upsert: true }
            );
            io.to(userto.connectionId).emit('notification',d);
            // console.log('notification',d);
        }
    })
}