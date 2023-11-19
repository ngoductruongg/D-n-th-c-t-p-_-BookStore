import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
   name: {
    type: String,
   },
   price: {
    type: String,
   },
   reducedprice: {
    type: String,
    // Make reducedprice optional by adding the 'required' property
    required: false,
   },
   author: {
    type: String,
    // Make author optional by adding the 'required' property
    required: false,
   },
   img: {
    type: String,
   },
   description: {
    type: String,
   },
   categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
   },
   rating: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Rating",
    },
  ],
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Product",ProductSchema);