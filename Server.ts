import express from 'express';
import { ENV } from "./dotenv";
import cors from 'cors';
import Api from './Api';
import Http from "http";
import * as socketio from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', Api);

// realtime
const server = Http.createServer(app);

server.listen(ENV.APP_PORT, () => {
    console.log(`Server is running on port ${ENV.APP_PORT}`);
});
interface CustomIo extends socketio.Server {
    _emit?: any
}
const io: CustomIo = new socketio.Server(server, {
    cors: {
        origin: "*",
    }
});
import realtime from "./realtime";
io.on('connection', async (socket: any) => {
    realtime.events(socket)
    realtime.chat(socket)
});
Object.assign(io, realtime.services);
export const Realtime: CustomIo = io;