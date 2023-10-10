import mongoose from 'mongoose';
import { UserRealtimeModel, MessageModel } from '../../Models';
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
}