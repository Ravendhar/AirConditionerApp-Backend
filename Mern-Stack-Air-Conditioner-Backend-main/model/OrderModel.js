const mongoose=require("mongoose")
const Products=require("./ProductModel")


const ordersSchema=mongoose.Schema(
   {

       orderItems:[{
           type:mongoose.Schema.Types.ObjectId,
           ref:'OrderItems',
           required:true
       }],
       address:{
           type:String,
           required:true
       },
       city:{
           type:String,
           required:true
       },
       zip:{

           type:String,
           required:true

       },
       country:
       {
           type:String,
           required:true

       },
       phone: {       
           type:Number,
           required:true
       },
       status:{
           type:String,
           default:"pending"
       },
       totalPrice:{
           type:Number,
           required:true
       },
       user:{
           type:mongoose.Schema.Types.ObjectId,
           ref:'Users',
           required:true

       },
       dateOrdered:{
           type:Date,
           default:Date.now()

       }
   
  }
  ,
  {
   timeStamps:true
  }
)

const Orders=mongoose.model("Orders",ordersSchema);

module.exports=Orders