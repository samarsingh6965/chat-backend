import { Socket } from 'socket.io';
import { UserRealtimeModel, MessageModel, NotificationModel } from '../../Models';
import { Realtime } from '../../Server'
interface CustomSocket extends Socket {
    userInfo: {
        userId: string
    } | any;
}

export default (socket: CustomSocket) => {
    socket.on('typing', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1, activeChat: 1 });
        if (userto.activeChat === data.from) {
            Realtime.to(userto.connectionId).emit('typing', data);
        }
        // console.log('typing', data, userto,userfrom);
    })
    socket.on('stop_typing', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1, activeChat: 1 });
        if (userto.activeChat === data.from) {
            Realtime.to(userto.connectionId).emit('stop_typing', socket.userInfo._id);
        }
        // console.log('stop_typing', data, userto,userfrom);
    })
    socket.on('message', async (data: any) => {
        let userto = await UserRealtimeModel.findOne({ userId: data.to }, { connectionId: 1, activeChat: 1 });
        let newMessage = await new MessageModel(data).save();
        if (userto.activeChat === data.from) {
            Realtime.to(userto.connectionId).emit('message', newMessage);
        } else {
            let d = await NotificationModel.findOneAndUpdate(
                {
                    from: data.from,
                    to: data.to,
                },
                {
                    lastMessage: newMessage._id,
                    seen: false
                },
                { new: true, upsert: true }
            ).populate('from', { name: 1 }).populate('lastMessage', { message: 1 });
            Realtime.to(userto.connectionId).emit('notification', d);
            // console.log('notification',d);
        }
    })
    socket.on('activeChat', async (data: any) => {
        let d = await UserRealtimeModel.findOneAndUpdate(
            {
                userId: data.from,
            },
            {
                activeChat: data.to,
            },
            { new: true }
        );
        // console.log('active Chat Updated',data,d);
    })

}