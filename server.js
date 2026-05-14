import cookieParser from "cookie-parser";
import express from "express"
import mongoose from "mongoose";

const app = express();


app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use(cookieParser())

app.get("/",(req, res)=>{
    res.json("backend works")
})

try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("db connects......")
    app.listen(process.env.PORT, ()=>{
        console.log("server runs....", process.env.PORT)    
    })
} catch (error) {
    console.log("Error happens in server or database connection")
}
