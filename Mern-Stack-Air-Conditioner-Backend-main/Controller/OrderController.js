const Orders=require("../model/OrderModel")
const OrderItems=require("../model/OrderItemModel")

const getAllOrders=async(req,res)=>{

    try{

        const orders= await Orders.find().populate('user','name').populate({
            path:"orderItems",  
            populate:{path:"product",
            populate:"category"}})
        .sort('dateOrdered');

        if(!orders){
           return res.status(400).json({message:"No orders Found",success:false})
        }

        res.status(200).json(orders)      
   }
   catch(error){
           

       res.status(500).json({message:error.message,success:false})
   }


}

const getParticularOrder=async(req,res)=>{

    try {

        const {id}=req.params

        const order=await Orders.findById({_id:id})


        if(!order){
            return res.status(400).json({message:"No orders Found with given id",success:false})
        }

        res.status(200).json(order)
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }

  

}

const getParticularUserOrder=async(req,res)=>{

    try {

        const user=req.user

        const ParticularUserOrder=await Orders.find({user:user._id}).populate({path:"orderItems",populate:"product"})


        if(!ParticularUserOrder){
            return res.status(400).json({message:"No orders Found with current user",success:false})
        }

        res.status(200).json(ParticularUserOrder)
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }



}

const placeOrder=async(req,res)=>{

    try {

           const Items=await OrderItems.insertMany(req.body.orderItems)


            const TotalPrices = await Promise.all(Items.map(async (item)=>{

            const productItem= await OrderItems.findById({_id:item._id}).populate('product','price')

            const totalPrice=productItem.product.price * item.quantity;


            return totalPrice;
          }))

          let price=0
           for (let index = 0; index < TotalPrices.length; index++) {
           
            price+=TotalPrices[index]
              
           }

          const Ids=Items.map(data=> data._id)

          req.body.orderItems=Ids

          req.body.totalPrice=price

          req.body.user=req.user._id


          const placedOrder=await Orders.create(req.body);


          if(!placedOrder){
            return res.status(400).json({message:"Order is not placed",success:false})
        }

        res.status(200).json(placedOrder)
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }


}

const updateOrderStatus=async(req,res)=>{
  
    try {

        const {id}=req.params

        const updatedStatus=await Orders.findByIdAndUpdate({_id:id},{status:req.body.status},{new:true})


        if(!updatedStatus){
            return res.status(400).json({message:"No order Found with given id and update Status is failed",success:false})
        }

        res.status(200).json({message:"order updated Status successfully",success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }



}

const cancelOrder=async(req,res)=>{

    try {

        const {id}=req.params

        const cancelOrderUpdate=await Orders.findByIdAndUpdate({_id:id},{status:"cancel"},{new:true})


        if(!cancelOrderUpdate){
            return res.status(400).json({message:"No order Found with given id and cancel Order is failed",success:false})
        }

        res.status(200).json({message:"order canceled😢",success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }

}

const deleteOrder=async(req,res)=>{

    try {

        const {id}=req.params


        // const orderItems=await Orders.findById({_id:id}).select('orderItems')

        const deletedorder=await Orders.findByIdAndDelete({_id:id})

       

        if(!deletedorder){
            return res.status(400).json({message:"No order Found with given id and delete is failed",success:false})
        }

        await deletedorder.orderItems.map(async (id)=>{

            const item=await OrderItems.findByIdAndDelete({_id:id})

            if(!item){
                return res.status(400).json({message:"No order Item Found with given id",success:false})
            }
        })
        



        res.status(200).json({message:"order deleted successfully",success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }



}








module.exports={getAllOrders,getParticularOrder,getParticularUserOrder,placeOrder,updateOrderStatus,cancelOrder,deleteOrder}