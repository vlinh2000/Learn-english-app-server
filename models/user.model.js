const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    pass: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model("User", UserSchema);


