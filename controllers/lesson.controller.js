const lessonModel = require("../models/lesson.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const lessons = await lessonModel.find();
            res.json({ lessons });
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

            const { audio, image } = req.files;
            const createAt = new Date();
            const newLesson = new lessonModel({
                name,
                createAt,
                image: image[0].path,
                audio: audio[0].path,
                author
            });
            await newLesson.save();
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

            const { name, author, time } = req.body;
            //update listen time

            if (time) {
                await lessonModel.updateOne({ _id }, { $inc: { time: 1 } });
                return res.json({ message: "Tăng lượt nghe thành công" });
            }

            //
            const { audio, image } = req.files;
            let updateFields = {
                name, author
            }

            updateFields = audio ? { ...updateFields, audio: audio[0].path } : updateFields;
            updateFields = image ? { ...updateFields, image: image[0].path } : updateFields;

            await lessonModel.updateOne({ _id }, { ...updateFields });

            res.json({ message: "Sửa bài học thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },

}