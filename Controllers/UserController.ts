import { UserModel } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export default {
    editPersnolDetail: async (req: any, res: any) => {
        try {
            const { _id } = req.body;
            const updatedUser = await UserModel.findByIdAndUpdate(_id,req.body,{new:true})
            .select('_id name email profileImage username gender bio')
            .populate('profileImage',{_id:1,url:1,mimetype:1});
            response.handleSuccess(res, updatedUser, 'Details Updated');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res)
        }
    },
}