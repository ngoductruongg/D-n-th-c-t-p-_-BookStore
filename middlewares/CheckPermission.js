import UserSchema from "../models/user";
import jwt from "jsonwebtoken";

export const CheckPermission = async (req, res, next) => {
  try {
    // Kiểm tra xem có token không
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Bạn phải đăng nhập để thực hiện hành động này",
      });
    }
    const token = req.headers.authorization.split(" ")[1];

    // Giải mã token
    jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({
            message: "Token hết hạn",
          });
        }
        if (error.name === "JsonWebTokenError") {
          return res.status(401).json({
            message: "Token không hợp lệ",
          });
        }
      }

      // Lấy thông tin người dùng từ payload
      const user = await UserSchema.findById(payload._id);

      if (!user) {
        return res.status(401).json({
          message: "Không tìm thấy người dùng",
        });
      }

      // Kiểm tra quyền của người dùng
      if (user.role !== "admin") {
        return res.status(403).json({
          message: "Bạn không đủ thẩm quyền để truy cập",
        });
      }

      // Lưu thông tin người dùng vào request để sử dụng trong các tác vụ tiếp theo
      req.user = user;

      // Cho phép tiếp tục xử lý yêu cầu
      next();
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
