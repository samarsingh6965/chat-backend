import {Message  } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export default {

    getMessages: async (req:any, res:any) => {
        try {
            const {from,to} = req.query;
            const tasks = await Message.find({from:from,to:to});
            return response.handleSuccess(res, 'messages fetched Successfully', tasks);
        } catch (error) {
            console.log("Exception", error);
            return response.somethingWentWrong(res)
        }
    },
}