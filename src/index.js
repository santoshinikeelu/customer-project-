const express = require("express")
const route = require("./routes/router")
const mongoose = require("mongoose")
const app = express()

app.use(express.json())

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://santoshinikeelu:santoshini@cluster0.zhokymy.mongodb.net/test`,{
    useNewUrlparser:true
})
.then(()=>console.log("mongoDB is connected"))
.catch((err)=>console.log(err))

app.use("/",route)

app.listen(process.env.PORT||3000,function(){
    console.log("express is running on port:",process.env.PORT||3000)
})