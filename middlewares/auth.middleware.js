const jwt = require("jsonwebtoken");
module.exports = {
    isAuth: (req, res, next) => {

        const token = req.body.token || req.query.token || req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).json({ message: "Vui lòng đăng nhập" });

        try {
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) throw err;

                req.decode = decode;
                next();
            });
        } catch (error) {
            return res.status(400).json({ message: "Token hết hạn!", error })
        }

    },
    isAdmin: (req, res, next) => {

        const token = req.body.token || req.query.token || req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).json({ message: "Vui lòng đăng nhập" });

        try {
            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
                if (err) throw err;

                if (!decode.isAdmin) return res.status(401).json({ message: "Không có quyền thực hiện chức năng này" });

                req.decode = decode;
                next();
            });
        } catch (error) {
            return res.status(400).json({ message: "Token hết hạn!", error })
        }

    }
}