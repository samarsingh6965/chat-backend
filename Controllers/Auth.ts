import { RolePermissionModel, UserModel } from "../Models/index";
import bcrypt from 'bcrypt'
import { generateToken } from "../JWT";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

// Get the current time


// Format the current time as a string

export default {
    login: async (req: any, res: any) => {
        const { email, password } = req.body;
        try {
            const User = await UserModel.findOne({ email });
            if (!User) {
                response.handleNotFound(res, 'Incorrect Email.');
            } else {
                const passwordMatch = await bcrypt.compare(password, User.password);
                if (!passwordMatch) {
                    response.unAuthorized(res, 'Password Incorrect.');
                } else {
                    const token = generateToken(User);
                    const userDetail = await UserModel.findOne(
                        { _id: User._id },
                        { _id: 1, name: 1, role: 1, company: 1, email: 1,profileImage:1 }
                    ).populate('role', { _id: 1, name: 1,code:1 });

                    if (userDetail.profileImage !== null) {
                        await userDetail.populate('profileImage', { _id: 1, url: 1, mimetype: 1 });
                    }
                    if (userDetail.company !== null) {
                        await userDetail.populate('company', { _id: 1, name: 1 });
                    }
                    const permission = await RolePermissionModel.find({ role: userDetail.role?._id, status: 'active' }, { _id: 1, role: 1, permission: 1 }).populate('permission', { _id: 1, controller: 1, action: 1 });
                    const Permissions = await permission.map((permission: any) => {
                        return {
                            controller: permission?.permission?.controller,
                            action: permission?.permission?.action,
                        }
                    });
                    response.handleSuccess(res, { userDetail, token, Permissions }, 'User LoggedIn.');
                }
            }
        } catch (error) {
            console.log("Exception", error);
            return response.somethingWentWrong(res);
        }
    },
}