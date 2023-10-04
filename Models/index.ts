import connection from '../Database/Db';
import MessageModel from "./MessageModel";
import URC from "./UserRealtimeConnection";

export const Message = MessageModel(connection);
export const UserRealtimeConnection = URC(connection);