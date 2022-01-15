const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordSchema = new Schema({
    word: { type: String, required: true },
    mean: { type: String, required: true },
    lessonId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Lesson" },
});

module.exports = mongoose.model("Word", WordSchema);


