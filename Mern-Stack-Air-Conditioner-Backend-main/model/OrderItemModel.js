const mongoose=require("mongoose")


const OrderItemsSchema=mongoose.Schema(
    {
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Products',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        colour:{
            type:String,
            default:"white"
        }
    }
)
  



const OrderItems=mongoose.model("OrderItems",OrderItemsSchema);

module.exports=OrderItems