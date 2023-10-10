import { UserRealtimeModel } from '../../Models';
export default (socket: any, io: any) => {
    socket.on('active_chat', async(data:any) => {
        try {
            const activeChat = await UserRealtimeModel.findOne({userId:data.to},{connectionId:1})
            console.log(activeChat)
            if(activeChat.connectionId !== null){
                let d = await UserRealtimeModel.findOneAndUpdate(
                    {
                        connectionId:socket.id,
                    },
                    {
                        activeChat:activeChat.connectionId
                    },
                    {new:true}
                );
            }
        } catch (error) {
            console.error("Exception[Disconnect]",error)
        }
    });
}