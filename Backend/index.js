const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const pinRoute = require('./routes/pinRoute');
const userRoute = require('./routes/userRoute');
const app = express();

//env
dotenv.config();

//mongodb connetcion
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log("Connection not successful", err);
});
//middleware
app.use(express.json());
//routes
app.use('/api/user/', userRoute);
app.use('/api/pin/', pinRoute);

app.listen(8000, () => {
    console.log("server is listen");
})