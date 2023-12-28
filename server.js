const express = require ("express");
const app = express();
const dotenv = require ("dotenv");
dotenv.config();

const dbConnect = require ("./config/database");
const userAuthRoute = require ("./routes/userAuthRoute");
const cors = require('cors');
const employeeRoute = require ("./routes/employeeRoute");


const PORT = process.env.PORT || 2000;

//database Calling / connection
dbConnect();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/auth',userAuthRoute);
app.use('/api/v1/employee',employeeRoute)

app.get("/",(req ,res)=>{
    res.send("iam working dear !");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port no : ${PORT} in ${process.env.NODE_ENV} Mode`)
})