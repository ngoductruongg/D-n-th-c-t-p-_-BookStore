import Comments from "../models/comment.js"
import { Comment_Schema } from "../middlewares/comment.js";

export const getAll= async (req, res, next) => {
  try {
    const data = await Comments.find();
    return res.json(data);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      
    });
  }
};
export const getCoursesForIdproduct = async (req, res, next) => {
  try {
    const productId = req.params.idproduct;
    // Sử dụng userId để tìm tất cả các khóa học của người dùng
    const data = await Comments.find({ productId: productId });
    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const DeleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comments.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Bình Luận không xóa thành công.',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Bình luận đã được xóa thành công.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Lỗi khi xóa bình luận.' });
  }
}

export const create=async(req,res)=>{
  try {
      const {error} = Comment_Schema.validate(req.body,{abortEarly:false});
      if(error){
          return res.status(400).json({
              message:error.details.map((err)=>err.message)
          })
      }
      const data= await Comments.create(req.body)
      return res.json({
          message: "Thêm thành công",
          data: data,
        });
  } catch (error) {
      return res.status(400).json({
          message: error.message
      })
  }
}

