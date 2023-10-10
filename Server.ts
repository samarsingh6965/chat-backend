import express from 'express';
import {ENV} from "./dotenv";
import cors from 'cors';
import Api from './Api';
import Realtime from "./realtime";
import Http from "http";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',Api);

// realtime
const server = Http.createServer(app);

Realtime(server);
server.listen(ENV.APP_PORT, () => {
    console.log(`Server is running on port ${ENV.APP_PORT}`);
});