import dotenv from 'dotenv';
dotenv.config();
const dbURL = process.env.DB_URL;
import mongoose from "mongoose";
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((response:any)=>{
    console.log('MongoDB Connection Succeeded.')
}).catch((error:any)=>{
    console.log('Error in DB connection: ' + error)
});
export default mongoose;