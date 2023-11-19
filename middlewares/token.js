// Middleware xác thực token
export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
  
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.sendStatus(403); // Token không hợp lệ
      }
      
      req.userId = decoded.userId; // Lưu userId vào request để sử dụng ở controller
      next();
    });
  };