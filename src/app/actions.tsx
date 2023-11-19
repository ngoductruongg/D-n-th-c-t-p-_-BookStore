
export const addToCart = (product: any) => {
  return {
    type: 'THÊM_VÀO_GIỎ_HÀNG',
    payload: {
      id: product._id,
      name: product.name, // Lấy tên sản phẩm
      price: product.price ,// Lấy giá sản phẩm
      img : product.img
      // product
    }
  };
};
export const removeFromCart = (productId: any) => {
  return {
    type: 'XÓA_KHỎI_GIỎ_HÀNG',
    payload: productId
  };
};
export const increaseProductQuantity = (productId:any) => {
  return {
    type: 'TĂNG_SỐ_LƯỢNG',
    payload: productId
  };
};

export const decreaseProductQuantity = (productId :any) => {
  return {
    type: 'GIẢM_SỐ_LƯỢNG',
    payload: productId
  };
};
