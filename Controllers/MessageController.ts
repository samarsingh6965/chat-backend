import mongoose from "mongoose";
import {MessageModel  } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export default {

    getMessages: async (req:any, res:any) => {
        try {
            const {from,to} = req.query;
            const tasks = await MessageModel.find({from:from,to:to});
            response.handleSuccess(res, tasks, 'messages fetched Successfully');
        } catch (error) {
            console.log("Exception", error);
            response.somethingWentWrong(res)
        }
    },
    updateMessages: async (req: any, res: any) => {
        try {
            const { to ,from} = req.body;
            const toId = new mongoose.Types.ObjectId(to)
            const fromId = new mongoose.Types.ObjectId(from)
            const updatedNotifications = await MessageModel.updateMany(
                { to:toId,from:fromId },
                { $set: { seen: true } }
            );
            response.handleSuccess(res, updatedNotifications, 'Messages updated Successfully');
        } catch (error) {
            console.log("Exception", error);
            response.somethingWentWrong(res);
        }
    },
}