import express from "express";
const app = express();

app.get('/',(req, res)=>{
    res.send('Ok');
});
const PORT = process.env.ENV || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})