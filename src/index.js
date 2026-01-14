import express from 'express';
import cors from 'cors';
import connectDB from './db/DB.connect.js';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";



const app = express();
dotenv.config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "https://task-fronted-nu.vercel.app",
    credentials: true,
}));

connectDB()
import taskRouter from "./router/route.js"
app.use("/api" , taskRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  
export default app;
