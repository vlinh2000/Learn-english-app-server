const userModel = require("../models/user.model");
const md5 = require("md5");

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await userModel.find();
            res.json({ users });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            let _id = req.decode._id || req.params._id
            const user = await userModel.findOne({ _id });

            if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

            res.json({ user });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    add: async (req, res) => {
        try {
            const { name, userName, pass } = req.body;

            const isExist = await userModel.findOne({ userName });
            if (isExist) return res.status(401).json({ message: "UserName đã tồn tại" });


            const newUser = new userModel({
                name,
                userName,
                pass: md5(pass)
            });

            await newUser.save();

            res.json({ message: "Thêm người dùng thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { _id } = req.params;
            const user = await userModel.findOne({ _id });
            if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

            await userModel.deleteOne({ _id });
            res.json({ message: "Xóa người dùng thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    patch: async (req, res) => {
        try {
            const { _id } = req.params;

            const user = await userModel.findOne({ _id });
            if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

            if (_id !== req.decode._id) return res.status(404).json({ message: "Không thể thay đổi thông tin người khác" });
            let { name, pass } = req.body;

            await userModel.updateOne({ _id },
                {
                    name, pass: md5(pass)
                });
            res.json({ message: "Sửa thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    }

}