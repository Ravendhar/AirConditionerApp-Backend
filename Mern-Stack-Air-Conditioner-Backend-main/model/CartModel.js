const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartItems: [{
      type:  mongoose.Schema.Types.ObjectId,
      ref: "CartItems"
    }],
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref: "Users"
    }
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports=Cart;