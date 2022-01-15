const mongoose = require("mongoose");
const wordModel = require("../models/word.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const { lessonId } = req.query;

            let words;
            if (lessonId) {
                words = await wordModel.find({ lessonId });
            } else {
                words = await wordModel.find();
            }

            res.json({ words });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const { _id } = req.params;
            const word = await wordModel.findOne({ _id });

            if (!word) return res.status(404).json({ message: "Từ không tồn tại" });

            res.json({ lesson });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    add: async (req, res) => {
        try {
            const { word, mean, lessonId } = req.body;

            const isWord = await wordModel.findOne({ word });
            if (isWord) return res.status(401).json({ message: "Từ đã tồn tại" });

            const newWord = new wordModel({
                word,
                mean,
                lessonId: mongoose.Types.ObjectId(lessonId)
            });
            await newWord.save();

            res.json({ message: "Thêm từ thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { _id } = req.params;
            const isWord = await wordModel.findOne({ _id });
            if (!isWord) return res.status(404).json({ message: "Từ không tồn tại" });

            await wordModel.deleteOne({ _id });
            res.json({ message: "Xóa từ thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },
    patch: async (req, res) => {
        try {
            const { _id } = req.params;

            const isWord = await wordModel.findOne({ _id });
            if (!isWord) return res.status(404).json({ message: "Từ không tồn tại" });

            const { word, mean } = req.body;

            await wordModel.updateOne({ _id }, { word, mean });
            res.json({ message: "Sửa từ thành công" });
        } catch (error) {
            res.status(500).json({ message: "Đã xảy ra lỗi", error: error.message });
        }
    },

}