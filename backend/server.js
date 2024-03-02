import  express  from "express";
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

import cookieParser from "cookie-parser";
dotenv.config()

const PORT = process.env.PORT || 5000;
const app = express();
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("hello world")
// })
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
    connectToMongoDB();
}
)