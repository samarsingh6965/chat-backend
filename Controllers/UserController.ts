import mongoose from "mongoose";
import { UserModel, MessageModel } from "../Models/index";
import bcrypt from 'bcrypt'
import ServerResponseClass from "../ServerResponse/ServerResponse";
const response = new ServerResponseClass();

export default {
    editPersnolDetail: async (req: any, res: any) => {
        try {
            const { _id } = req.body;
            const updatedUser = await UserModel.findByIdAndUpdate(_id, req.body, { new: true })
                .select('_id name email profileImage username gender bio block_list')
            // console.log(updatedUser)
            response.handleSuccess(res, updatedUser, 'Details Updated');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res)
        }
    },
    getUsers: async (req: any, res: any) => {
        const { search } = req.query;
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        try {
            const chatHistory = await MessageModel.distinct('from', {
                $or: [
                    { from: req.user.userId },
                    { to: req.user.userId },
                ],
            });
            const chatHistory2 = await MessageModel.distinct('to', {
                $or: [
                    { from: req.user.userId },
                    { to: req.user.userId },
                ],
            });
            const uniqueUserIds = [...new Set([...chatHistory, ...chatHistory2])];
            let filter: any;
            if (search) {
                filter = {
                    status: "active",
                    _id: { $ne: userId },
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { username: { $regex: search, $options: 'i' } }
                    ]
                };
            } else {
                filter = {
                    status: "active",
                    _id: { $ne: userId, $in: uniqueUserIds },
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { username: { $regex: search, $options: 'i' } }
                    ]
                };
            }
            const Users = await UserModel.find(filter, {
                _id: 1,
                name: 1,
                profileImage: 1,
                gender: 1,
                username: 1,
                bio: 1,
                block_list: 1
            });
            const lastMessages = await MessageModel.aggregate([
                {
                    $match: {
                        $or: [
                            { from: userId },
                            { to: userId },
                        ],
                    },
                },
                {
                    $sort: { timestamp: -1 } // Sort messages by timestamp in descending order
                },
                {
                    $group: {
                        _id: { $cond: [{ $eq: ['$from', userId] }, '$to', '$from'] },
                        lastMessage: { $first: '$$ROOT' }
                    }
                },
            ]);
            // Combine the user data and last messages
            const usersWithLastMessages = await Users.map((user: any) => {
                const lastMessage = lastMessages.find((message: any) => message._id.equals(user._id));
                return {
                    ...user.toObject(),
                    lastMessage: lastMessage ? lastMessage.lastMessage : null
                };
            });
            response.handleSuccess(res, usersWithLastMessages, 'Users Fetched');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },

    getUserByUserId: async (req: any, res: any) => {
        const { _id } = req.query;
        try {
            const User = await UserModel.findOne({ _id, status: 'active' }, {
                _id: 1,
                name: 1,
                profileImage: 1,
                gender: 1,
                username: 1,
                bio: 1,
                block_list: 1
            });
            response.handleSuccess(res, User, 'Users Fetched');
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
    editPassword: async (req: any, res: any) => {
        const { _id, old_password, new_password } = req.body;
        try {
            const User = await UserModel.findOne({ _id, status: 'active' }, {
                _id: 1,
                password: 1
            });
            const passwordMatch = await bcrypt.compare(old_password, User.password);
            if (!passwordMatch) {
                response.unAuthorized(res, "Old password not matched.")
            } else {
                const hashedPassword = await bcrypt.hash(new_password, 10);
                await UserModel.findByIdAndUpdate(_id, { password: hashedPassword });
                response.handleSuccess(res, null, 'Password updated successfully.');
            }
        } catch (error) {
            console.error(error);
            response.somethingWentWrong(res);
        }
    },
    addToBlockList: async (req: any, res: any) => {
        const { _id, userId } = req.body;
        try {
            const user = await UserModel.findById(_id);
            if (!user.block_list.includes(userId)) {
                user.block_list.push(userId);
                user.modified_at = Date.now();
                await user.save();
                const upDated = await UserModel.findById(_id, { _id: 1, name: 1, email: 1, profileImage: 1, username: 1, gender: 1, bio: 1, block_list: 1 })
                response.handleSuccess(res, upDated, 'Blocked.');
            } else {
                response.badRequest(res, 'Already Blocked.');
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    removeFromBlockList: async (req: any, res: any) => {
        const { _id, userId } = req.body;
        try {
            const user = await UserModel.findById(_id);
            const index = user.block_list.indexOf(userId);
            user.block_list.splice(index, 1);
            user.modified_at = Date.now();
            await user.save();
            const upDated = await UserModel.findById(_id, { _id: 1, name: 1, email: 1, profileImage: 1, username: 1, gender: 1, bio: 1, block_list: 1 })
            response.handleSuccess(res, upDated, "Unblocked.")
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

}