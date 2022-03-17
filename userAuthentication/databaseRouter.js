const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    console.log("Router is working");
    res.send("everything gonna be fine.");
});
router.get("/user/coins/:name", (req, res) => {
    console.log("welcome to home");
    res.send("home is everything");
});
module.exports=router;