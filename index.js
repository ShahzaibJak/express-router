const express = require("express");

const app = express();
app.use(express.json())
//Index File
app.get("/",(req,res)=>{
    res.status(200).send("<h1>Index</h1>")
})

//User Module
app.use('/api',require("./routes/api/root"))

app.listen(3000,()=>console.log("Server running on PORT 3000"))