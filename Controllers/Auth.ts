import { UserModel } from "../Models/index";
import bcrypt from 'bcrypt'
import { generateToken } from "../JWT";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

// Get the current time


// Format the current time as a string

export default {
    register: async (req:any, res:any) => {
        try {
            const { username, email, password } = req.body;
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
            });
            await newUser.save();
            response.handleSuccess(res,'Registration successful');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res)
        }
    },
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
                        { _id: 1, name: 1, role: 1, company: 1, email: 1, profileImage: 1 }
                    ).populate('role', { _id: 1, name: 1, code: 1 });
                    if (userDetail.profileImage !== null) {
                        await userDetail.populate('profileImage', { _id: 1, url: 1, mimetype: 1 });
                    }
                    response.handleSuccess(res, { userDetail, token, Permissions }, 'User LoggedIn.');
                }
            }
        } catch (error) {
            console.log("Exception", error);
            return response.somethingWentWrong(res);
        }
    },
}