const express = require('express');
const app = express();
const DB = require('./database').connectDB;
const userRouter = require('./Routes/userRouters');
const gymRouter = require('./Routes/GymRouter');
const memberRouter = require('./Routes/memberRouter');
const trainerRouter = require('./Routes/trainerRouter');
const classRouter = require('./Routes/classRouter');
const scheduleRouter = require('./Routes/scheduleRouter');
DB();


app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/gym', gymRouter);
app.use('/api/member', memberRouter);
app.use('/api/trainer', trainerRouter);
app.use('/api/classes', classRouter);
app.use('/api/schedule', scheduleRouter)

app.listen(process.env.PORT, () => {

    console.log(`listening on Port:  ${process.env.PORT}`);
})