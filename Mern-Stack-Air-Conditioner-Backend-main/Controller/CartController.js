const Cart=require("../model/CartModel")
const CartItems=require("../model/CartItems")


const getParticularUserCart=async(req,res)=>{

    try {

        const user=req.user
        const cart=await Cart.find({user:user._id}).populate({path:'cartItems',populate:"product"})
       

        if(!cart){
            return res.status(400).json({message:"No cart items found",success:false})
        }

        res.status(200).json(cart)
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }

  

}


const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuantity = req.body.productquantity;

    // Find the cart item by ID
    const cartItem = await CartItems.findById(id);

    if (cartItem) {
      // Update the quantity of the specific cart item
      cartItem.productquantity = updatedQuantity;

      // Save the changes to the cart item
      await cartItem.save();

     
      // Return the updated cart
      res.status(200).json({message:"quantity updated"});
    } else {
      res.status(404).json({ message: 'Cart item not found', success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};





const AddToCart = async (req, res) => {
    try {
      const user = req.user;
      const cartItemsData = req.body.cartItems; // Assuming the request body contains an array of cart items
  
      // Create cart items
      const createdCartItems = await CartItems.insertMany(cartItemsData);
  
      // Extract the IDs of the created cart items
      const cartItemIds = createdCartItems.map(item => item._id);
  
      // Find or create a cart for the user and update its cartItems field
      const cart = await Cart.findOneAndUpdate(
        { user: user._id },
        { $addToSet: { cartItems: { $each: cartItemIds } } }, // Using $addToSet to avoid duplicate entries
        { new: true, upsert: true }
      ).populate('cartItems');
  
      if (!cart) {
        return res.status(400).json({ message: 'Cart item(s) are not added to the cart', success: false });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  };
  




  const deleteCartItem = async (req, res) => {
    try {
      const deletedCartItem = await CartItems.findByIdAndDelete(req.params.id);
  
      if (!deletedCartItem) {
        return res.status(404).json({ message: 'Cart item not found', success: false });
      }
  
      res.status(200).json({ message: 'Cart item deleted successfully', success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  };
  


  const deleteAllCartItemsForUser = async (req, res) => {
    try {
      const user = req.user; // Assuming you have the user object in req.user
  
      // Find the cart for the user
      const userCart = await Cart.findOne({ user: user._id }).populate('cartItems');
  
      if (!userCart) {
        return res.status(404).json({ message: 'Cart not found for the user', success: false });
      }
  
      // Get the list of cart items associated with the user's cart
      const cartItemsToDelete = userCart.cartItems.map(cartItem => cartItem._id);
  
      // Delete all cart items associated with the user's cart
      await CartItems.deleteMany({ _id: { $in: cartItemsToDelete } });
  
      res.status(200).json({ message: 'All cart items deleted successfully', success: true });
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  };


  const checkCartItem=async (req, res) => {
    try {
      const productId = req.params.productId;
  
      // Find if the product with the given ID exists in the cart items
      const existingCartItem = await CartItems.findOne({ 'product': productId });
  
      if (existingCartItem) {
        // Product exists in the cart
        res.status(200).json({ message: 'Product already exists in the cart', isInCart: true });
      } else {
        // Product does not exist in the cart
        res.status(200).json({ message: 'Product does not exist in the cart', isInCart: false });
      }
    } catch (error) {
      res.status(500).json({ message: error.message, success: false });
    }
  }
  
  







module.exports={getParticularUserCart,AddToCart,deleteAllCartItemsForUser,deleteCartItem,updateCart,checkCartItem}