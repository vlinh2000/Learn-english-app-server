const express = require('express');

const app = express();
const PORT = 8000;
const dotenv = require('dotenv');
dotenv.config();

//connect db
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
    console.log("Connect database successfully");
}).catch((err) => {
    console.log("Connect database failt" + err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Routes
const lessonRouter = require("./routes/lesson.route");
const wordRouter = require("./routes/word.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

//middleware 
const authMiddleware = require("./middlewares/auth.middleware");

app.use("/login", authRouter);
app.use(authMiddleware.isAuth);
app.use('/user', userRouter);
app.use('/lesson', lessonRouter);
app.use('/word', wordRouter);

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})
