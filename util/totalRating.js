import Product from "../models/product"; 

async function calculateTotalRating(productId) {
    try {
      // Lấy sản phẩm dựa trên productId và populate trường rating
      const product = await Product.findById(productId).populate('rating');
  
      if (!product) {
        throw new Error('Sản phẩm không tồn tại.');
      }
  
      // Lấy danh sách đánh giá của sản phẩm
      const ratings = product.rating;
  
      if (!ratings || ratings.length === 0) {
        throw new Error('Không có đánh giá cho sản phẩm.');
      }
  
      // Tính tổng điểm đánh giá
      const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  
      // Tính điểm trung bình
      const averageRating = total / ratings.length;
  
      // Cập nhật trường totalRating của sản phẩm
      product.totalRating = averageRating;
  
      // Lưu sản phẩm với totalRating cập nhật
      await product.save();
  
      return averageRating;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

// Hàm lấy giá trị totalRating của sản phẩm
async function getTotalRating(productId) {
  try {
    // Lấy sản phẩm dựa trên productId
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Sản phẩm không tồn tại.');
    }

    // Trả về giá trị totalRating của sản phẩm
    return product.totalRating;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Export các hàm để sử dụng trong mã của bạn
export { calculateTotalRating, getTotalRating };
