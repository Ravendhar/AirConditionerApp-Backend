const mongoose=require("mongoose")




const CategorySchema=mongoose.Schema(
    {

        type:{
            type:String,
            required:true
        },
        capacity:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Category=mongoose.model("Category",CategorySchema);


module.exports=Category