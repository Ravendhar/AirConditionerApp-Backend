const express=require("express");
require("dotenv").config();
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const cookieparser=require("cookie-parser")



// routes imports
const UserRoutes = require("./Routes/userRoutes")
const OrderRoutes=require("./Routes/OrderRoutes")
const ProductRoutes=require("./Routes/ProductRoutes");
const CategoryRoutes=require("./Routes/CategoryRoutes")
const CartRoutes=require("./Routes/CartRoutes")




//middleware Configuration


// json data passing over url
app.use(express.json())

// cross origin 
app.use(cors({
    origin:"https://advancedairconditioner.netlify.app",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

// decode the cookie data 
app.use(cookieparser())





// getting the connection data from the env file
const Port=process.env.PORT || 7000;

const MONGO_URL=process.env.MONGO_URL;



//connection
mongoose.connect(MONGO_URL).then(()=>{

    console.log("Connect to Db Succesfully❤")
    app.listen(Port,()=>{
        console.log(`im running on the port ${Port}`)
    })
})
.catch((err)=>{
    console.log(err.message);
})



// routes api call
app.use("/user",UserRoutes)
app.use("/products",ProductRoutes)
app.use("/category",CategoryRoutes)
app.use("/orders",OrderRoutes)
app.use("/cart",CartRoutes)












