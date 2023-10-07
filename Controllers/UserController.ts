import { UserModel } from "../Models/index";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export default {
    editPersnolDetail: async (req: any, res: any) => {
        try {
            const { _id } = req.body;
            const updatedUser = await UserModel.findByIdAndUpdate(_id,req.body,{new:true})
            .select('_id name email profileImage username gender bio')
            if (updatedUser.profileImage !== null) {
                await updatedUser.populate('profileImage', { _id: 1, url: 1, mimetype: 1 });
            }
            response.handleSuccess(res, updatedUser, 'Details Updated');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res)
        }
    },
    getUsers: async (req: any, res: any) => {
        try {
            const Users = await UserModel.find({status:"active",_id:{$ne:req.user.userId}},{_id:1,name:1,profileImage:1,gender:1,bio:1}).populate('profileImage', { _id: 1, url: 1, mimetype: 1 });
            response.handleSuccess(res, Users, 'Users Fetched');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res)
        }
    },
}