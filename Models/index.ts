import connection from '../DB/Connection';
import User from "./UserModel/UserModel";
import Media from './MediaModel/MediaModel'
import MediaRef from './MediaModelRef/MediaModelRef'
import URC from './URC/URCModel'

export const UserModel = User(connection);
export const UserRealtimeModel = URC(connection);
export const MediaModel = Media(connection);
export const MediaRefModel = MediaRef(connection);