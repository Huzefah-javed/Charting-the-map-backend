import cookieParser from "cookie-parser";
import express from "express"
import mongoose from "mongoose";
import { mainRouter } from "./router/main.router.js";
import { error } from "./middlewares/error.js";

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use(cookieParser())

app.use(mainRouter)
app.use(error)

try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("db connects......")
    app.listen(process.env.PORT, ()=>{
        console.log("server runs....", process.env.PORT)    
    })
} catch (error) {
    console.log("Error happens in server or database connection")
}
