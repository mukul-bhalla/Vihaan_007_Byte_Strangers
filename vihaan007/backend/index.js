if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();

const port = process.env.PORT;

const cors = require('cors');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const roomRouter = require('./routes/rooms');
const bnbRouter = require('./routes/bnbs');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("MongoDB Connected !");
    })
    .catch((e) => {
        console.log("Mongo Error");
        console.log(e);
    })

app.use(cors());
app.use(express.json());

//ROUTERS
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/rooms', roomRouter)
app.use('/api/bnbs', bnbRouter)

// Error Handler Middleware

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json(
        {
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack
        }
    );

})

app.get('/', (req, res) => {
    res.send("HELLO");
})




app.listen(port, () => {
    console.log(`Listening at PORT ${port}`);
})