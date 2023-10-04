import express from 'express';
import cors from "cors";
import crypto from "crypto";
const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

import Routes from './Router/Router';
app.use('/api', Routes)

import Http from "http";
const server = Http.createServer(app);
import Realtime from "./realtime";
Realtime(server);
server.listen(PORT, () => {
    console.log('listening on *:5000');
});