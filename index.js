const express = require('express');
var cors = require('cors');
const app = express();
const mongoose = require("mongoose");

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000;

//Routes
const lessonRouter = require("./routes/lesson.route");
const wordRouter = require("./routes/word.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

//middleware 
const authMiddleware = require("./middlewares/auth.middleware");

//connect db
mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
    console.log("Connect database successfully");
}).catch((err) => {
    console.log("Connect database failt" + err);
});

app.use("/login", authRouter);
// app.use(authMiddleware.isAuth);
app.use('/api/user', userRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/word', wordRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})
