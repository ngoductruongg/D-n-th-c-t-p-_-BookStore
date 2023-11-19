// Ví dụ về cartReducer
const initialState = {
  cartItems: []
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THÊM_VÀO_GIỎ_HÀNG':
      // Tìm xem sản phẩm đã có trong giỏ hàng chưa
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);

      if (existingItem) {
        // Tăng số lượng nếu sản phẩm đã tồn tại
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        // Thêm sản phẩm mới với quantity là 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }
      case 'XÓA_KHỎI_GIỎ_HÀNG':
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== action.payload)
        };
        case 'TĂNG_SỐ_LƯỢNG':
          return {
            ...state,
            cartItems: state.cartItems.map(item =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        case 'GIẢM_SỐ_LƯỢNG':
          return {
            ...state,
            cartItems: state.cartItems.map(item =>
              item.id === action.payload
                ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Đảm bảo số lượng không giảm xuống dưới 1
                : item
            )
          };
    // Xử lý các actions khác nếu cần
    default:
      return state;
  }
};

export default cartReducer;