import mongoose from "mongoose";
const RatingSchema = new mongoose.Schema(
    {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number,
        feedback: String,
        hidden: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    }
);

export default mongoose.model('Rating',RatingSchema)