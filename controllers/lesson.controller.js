const lessonModel = require("../models/lesson.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const all = await lessonModel.find();
            res.json({ all });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const { _id } = req.params;
            const lesson = await lessonModel.findOne({ _id });

            if (!lesson) return res.status(404).json({ message: "Bài học không tồn tại" });

            res.json({ lesson });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    add: async (req, res) => {
        try {
            const { name, author } = req.body;

            const lesson = await lessonModel.findOne({ name });
            if (lesson) return res.status(401).json({ message: "Bài học đã tồn tại" });

            const createAt = Date.now();

            console.log(req.file);
            // const newLesson = new lessonModel({
            //     name,
            //     createAt,
            //     image,
            //     audio,
            //     author
            // });
            // await newLesson.save();
            res.json({ message: "Thêm bài học thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { _id } = req.params;
            const lesson = await lessonModel.findOne({ _id });
            if (!lesson) return res.status(404).json({ message: "Bài học không tồn tại" });

            await lessonModel.deleteOne({ _id });
            res.json({ message: "Xóa bài học thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    patch: async (req, res) => {
        try {
            const { _id } = req.params;

            const lesson = await lessonModel.findOne({ _id });
            if (!lesson) return res.status(404).json({ message: "Bài học không tồn tại" });

            const { name, time, author } = req.body;
            //file

            // await lessonModel.deleteOne({ _id });
            res.json({ message: "Sửa bài học thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },

}