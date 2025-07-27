import express from "express";

const app = express();

app.listen(3000 ,() => {
    console.log("app is runing")
} )

app.get("/", (req,res) =>{
    res.send("this is your main route")
})