import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema(
  {
    productId:{
        type:String
       },
    userId:{
        type: String
    }, 
    nameuser:{
      type: String
  },
    content:{
        type: String
    }, 
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Comments",CommentSchema);