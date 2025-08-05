import { sequelize } from "./config/db";
import router from "./routes/route";
import cors from 'cors';

const express=require('express')
const app=express()
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, 
}));


app.use('/api',router)

sequelize.authenticate().then(()=>{
    console.log("Pg connected");
    return sequelize.sync();
    
}).then(()=>{
    app.listen(5000,()=>console.log("Serever Started")
    )
}).catch((err:unknown)=>{
    console.log("Err",err);
    
})