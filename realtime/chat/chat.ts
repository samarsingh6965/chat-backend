import { UserRealtimeModel, MessageModel } from '../../Models';
export default (socket: any, io: any) => {
    socket.on('typing', async (data: any) => {
        let user = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 })
        if (user) {
            io.to(user.connectionId).emit('typing', socket.userInfo._id);
        }
        console.log('typing', data, user);
    })
    socket.on('stop_typing', async (data: any) => {
        let user = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 })
        if (user) {
            io.to(user.connectionId).emit('stop_typing', socket.userInfo._id);
        }
        console.log('stop_typing', data, user);
    })
    socket.on('message', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1 })
        if (userto) {
            let d = await new MessageModel(data).save()
            io.to(userto.connectionId).emit('message', d);
        }
    })
}