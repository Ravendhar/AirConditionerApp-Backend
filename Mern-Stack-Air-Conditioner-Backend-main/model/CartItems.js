const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products"
  },
  productquantity: {
    type: Number,
    required: true,
  },
});

const CartItems = mongoose.model('CartItems', cartItemSchema);
  
module.exports=CartItems;