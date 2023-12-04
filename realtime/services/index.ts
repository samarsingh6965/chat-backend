import { UserRealtimeModel } from "../../Models";

export default {
    async _emit(_event: string, data: any, _user: string = '') {
        if (_user)
            try {
                let conn = await UserRealtimeModel.findOne({ userId: _user }, { connectionId: 1 });
                if (conn)
                    this.to(conn.connectionId).emit(_event, data)
            } catch (error) {
                console.log("Exception", error);
            }
    },
}