import  express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from "./router/auth.js"

dotenv.config()

const app = express();
const PORT = 5001;
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json());


app.use('/api/auth', authRouter)
app.get('/test', (req,res) => {
    res.json('test ok')
})

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        app.listen(PORT, () => console.log(`Сервер успешно запущен на ${PORT} порту`))
    } catch (e) {
        console.log(e)
    }
}

start()

