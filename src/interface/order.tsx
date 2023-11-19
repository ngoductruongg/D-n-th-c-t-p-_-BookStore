// Interface cho thông tin chi tiết của một đơn hàng
export interface IOrder {
    _id: string; // ID của đơn hàng
    orderDate: Date; // Ngày đặt hàng
    orderStatus: "Chờ xử lý" | "Đã xác nhận" | "Đã thanh toán"; // Trạng thái đơn hàng
    course: {
      _id: string; // ID của khóa học
      name: string; // Tên khóa học
      price: string; // Giá khóa học
      // Các trường khác nếu cần
    };
    user: {
      _id: string; // ID của người dùng
      name: string; // Tên người dùng
      email: string; // Email người dùng
      phoneNumber: string; // Số điện thoại người dùng
      // Các trường khác nếu cần
    };
    payment: {
      paymentMethod: "Thanh toán bằng thẻ" | "Chuyển khoản ngân hàng" | "Ví điện tử"; // Phương thức thanh toán
      paymentDate: Date; // Ngày thanh toán
      transactionID: string; // Mã giao dịch
      paymentAmount: string; // Số tiền thanh toán
      paymentContent: string; // Nội dung thanh toán
      bankName: string; // Tên ngân hàng (nếu có)
    };
  }
  
  // Interface cho phản hồi từ API về đơn hàng
export interface IOrderApiResponse {
    status: "OK" | "ERR"; // Trạng thái phản hồi
    message: string; // Thông điệp từ API
    data: IOrder; // Dữ liệu đơn hàng
    // Thêm các trường khác nếu cần
  }
  

  