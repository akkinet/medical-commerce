import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  descTitle: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  brand: {
    type: String,
    trim: true,
    index: true,
  },
  images: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  isFeatured: {
    type: Boolean,
    default: true
  },
  // discountedPrice: {
  //   type: Number,
  //   min: 0,
  //   validate: {
  //     validator: function(value) {
  //       return value < this.price;
  //     },
  //     message: 'Discounted price must be lower than the original price'
  //   }
  // },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  prescription: {
    type: Boolean,
    default: false
  },
  // ratings: [{
  //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //   rating: { type: Number, min: 1, max: 5 },
  //   review: String
  // }],
  // averageRating: {
  //   type: Number,
  //   min: 0,
  //   max: 5,
  //   default: 0 
  // }
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;