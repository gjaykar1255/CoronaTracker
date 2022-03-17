const express=require('express');
const router=require("./databaseRouter")
const port = process.env.PORT || 5000;
const app=express();
app.use(router);
app.listen(port,()=>{
    console.log("server listening");
});
