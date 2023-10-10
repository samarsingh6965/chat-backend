import {MessageModel  } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export default {

    getMessages: async (req:any, res:any) => {
        try {
            const {from,to} = req.query;
            const tasks = await MessageModel.find({from:from,to:to});
            response.handleSuccess(res, 'messages fetched Successfully', tasks);
        } catch (error) {
            console.log("Exception", error);
            response.somethingWentWrong(res)
        }
    },
}