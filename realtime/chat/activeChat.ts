import { UserRealtimeModel } from '../../Models';
export default (socket: any, io: any) => {
    socket.on('active_chat', async(data:any) => {
        try {
                let d = await UserRealtimeModel.findOneAndUpdate(
                    {
                        connectionId:socket.id,
                    },
                    {
                        activeChat:data.to
                    },
                    {new:true}
                );
                console.log('object',d)
        } catch (error) {
            console.error("Exception[Disconnect]",error)
        }
    });
}