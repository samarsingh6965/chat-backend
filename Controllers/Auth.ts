import { UserModel } from "../Models/index";
import bcrypt from 'bcrypt'
import { generateToken } from "../JWT";
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export default {
    register: async (req: any, res: any) => {
        try {
            const { username, email, password, name, gender } = req.body;
            const existingEmail = await UserModel.findOne({ email });
            const existingUsername = await UserModel.findOne({ username });
            if (existingEmail || existingUsername) {
                return res.status(400).json({ message: 'Email or Username already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await new UserModel({
                gender,
                name,
                username,
                email,
                password: hashedPassword,
            }).save();
            response.handleSuccess(res, newUser, 'Registration successful');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res)
        }
    },
    getUsername: async (req: any, res: any) => {
        try {
            const Usernames = await UserModel.find({ status: { $ne: 'deleted' } }, { username: 1, email: 1 });
            if (!Usernames) {
                response.handleNotFound(res, 'No Usernames Found');
            } else {
                response.handleSuccess(res, Usernames, 'Usernames Fetched')
            }
        } catch (error) {
            console.log("Exception", error);
            return response.somethingWentWrong(res);
        }
    },
    login: async (req: any, res: any) => {
        const { username, password } = req.body;
        try {
            let User = await UserModel.findOne({ email: username }) || await UserModel.findOne({ username: username });
            if (!User) {
                response.handleNotFound(res, 'Incorrect Email Or Username');
            } else {
                const passwordMatch = await bcrypt.compare(password, User.password);
                if (!passwordMatch) {
                    response.unAuthorized(res, 'Password Incorrect.');
                } else {
                    const token = generateToken(User);
                    const userDetail = await UserModel.findOne(
                        { _id: User._id },
                        { _id: 1, name: 1, email: 1, profileImage: 1, username: 1, gender: 1 ,bio:1}
                    );
                    if (userDetail.profileImage !== null) {
                        await userDetail.populate('profileImage', { _id: 1, url: 1, mimetype: 1 });
                    }
                    response.handleSuccess(res, { userDetail, token }, 'User LoggedIn.');
                }
            }
        } catch (error) {
            console.log("Exception", error);
            return response.somethingWentWrong(res);
        }
    },
}