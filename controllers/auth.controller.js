const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
const md5 = require("md5");

module.exports = {
    login: async (req, res) => {
        try {
            const { userName, passWord } = req.body;

            const user = await userModel.findOne({ userName });
            if (!user) return res.status(404).json({ message: "UserName không tồn tại" });

            if (user.pass !== md5(passWord)) return res.status(401).json({ message: "Mật khẩu không chính xác" });


            //tao token refesh token 
            const token = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    userName: user.userName,
                    pass: user.pass,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SECRET,
                {
                    algorithm: "HS256",
                    expiresIn: "3650d",
                }
            )

            const refreshToken = jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                    userName: user.userName,
                    pass: user.pass,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SECRET_REFRESH,
                {
                    algorithm: "HS256",
                    expiresIn: "3650d",
                }
            )

            res.json({ token, refreshToken });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
}