const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    name: { type: String, required: true },
    creatAt: { type: Date, required: true },
    image: { type: String, required: true },
    audio: { type: String, required: true },
    time: { type: Number, required: true, default: 0 },
    author: { type: String, required: true },
});

module.exports = mongoose.model("Lesson", LessonSchema);


