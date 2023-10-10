import mongoose from 'mongoose';
import { UserRealtimeModel, MessageModel } from '../../Models';
export default (socket: any, io: any) => {
    socket.on('typing', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 });
        let userfrom = await UserRealtimeModel.findOne({ userId: data.from }, { activeChat: 1 });
        if (userto) {
            const newObjectId = new mongoose.Types.ObjectId(data.to);
            if(newObjectId.equals(userfrom.activeChat)){
                io.to(userto.connectionId).emit('typing', socket.userInfo._id);
            }
        }
        // console.log('typing', data, userto,userfrom);
    })
    socket.on('stop_typing', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 });
        let userfrom = await UserRealtimeModel.findOne({ userId: data.from }, { activeChat: 1 });
        if (userto) {
            const newObjectId = new mongoose.Types.ObjectId(data.to);
            if(newObjectId.equals(userfrom.activeChat)){
                io.to(userto.connectionId).emit('stop_typing', socket.userInfo._id);
            }
        }
        // console.log('stop_typing', data, userto,userfrom);
    })
    socket.on('message', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 });
        let userfrom = await UserRealtimeModel.findOne({ userId: data.from }, { activeChat: 1 });
        if (userto) {
            const newObjectId = new mongoose.Types.ObjectId(data.to);
            let d = await new MessageModel(data).save();
            if(newObjectId.equals(userfrom.activeChat)){
                io.to(userto.connectionId).emit('message', d);
            }else{
                io.to(userto.connectionId).emit('notify', d);
            }
        }
    })
}