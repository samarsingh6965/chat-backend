import {NotificationModel  } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export default {
    getNotifications: async (req:any, res:any) => {
        try {
            const {to} = req.query;
            const tasks = await NotificationModel.find({to:to});
            response.handleSuccess(res, tasks, 'Notifications fetched Successfully');
        } catch (error) {
            console.log("Exception", error);
            response.somethingWentWrong(res);
        }
    },
    updateNotifications: async (req: any, res: any) => {
        try {
            const { to } = req.query;
            const updatedNotifications = await NotificationModel.updateMany(
                { to: to,},
                { $set: {seen:true}}
            );
            response.handleSuccess(res, updatedNotifications, 'Notifications updated Successfully');
        } catch (error) {
            console.log("Exception", error);
            response.somethingWentWrong(res);
        }
    },
}