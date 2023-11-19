import Product from "../models/product";
import { productSchema } from "../middlewares/product";
import category from "../models/category";
import { v2 as cloudinary } from "cloudinary";

export const getAll = async (req, res) => {
    try {
      // Lấy danh sách tất cả sản phẩm và populate trường categoryId và rating
      const products = await Product.find()
        .populate('categoryId', 'name')
      return res.json({
        message: 'Lấy dữ liệu thành công',
        data: products,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  export const getOne = async (req, res) => {
    try {
        const productId = req.params.id;

        // Kiểm tra xem productId có tồn tại hay không
        if (!productId) {
            return res.status(400).json({ message: 'Thiếu productId trong yêu cầu' });
        }

        // Lấy thông tin sản phẩm và danh sách rating của sản phẩm
        const product = await Product.findById(productId)
            .populate('categoryId', 'name')
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.json({
            message: 'Lấy dữ liệu thành công',
            data: {
                ...product.toObject()
            },
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const remove = async (req, res) => {
    try {
      //sử lý khi xóa phải xóa ảnh ở trên cloudinary
      const productId = req.params.id;
      const product = await Product.findById(productId);
      const imageUrl = product.img; //  image URL
      const parts = imageUrl.split('/'); // Chia chuỗi URL thành các phần dựa trên dấu /
      const imageFileName = parts[parts.length - 1]; // Lấy phần cuối cùng của mảng là tên tệp ảnh
  
      // Nối tên tệp ảnh với tiền tố 'lesson_img/' để tạo publicId
      const publicId = `lesson_img/${imageFileName.split('.').slice(0, -1).join('.')}`;
  
      // Sử dụng phương thức uploader.destroy của Cloudinary để xóa ảnh bằng publicId
      cloudinary.uploader.destroy(publicId);
  
      //hàm xóa ở trong cơ sở dữ liệu
      const data = await Product.findByIdAndDelete(productId);
  
      return res.json({
        message: "Xóa thành công",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  
  
  
  export const update = async (req, res) => {
    try {
      const filedata = req.file
      console.log(filedata);
  
      const productId = req.params.id;
      const product = await Product.findById(productId);
  
      if (filedata) {
        // Nếu có file mới được tải lên, xử lý xóa hình ảnh cũ trên Cloudinary
        if (product && product.img) {
          const imageUrl = product.img; // URL hình ảnh
          const parts = imageUrl.split('/'); // Chia chuỗi URL thành các phần dựa trên dấu /
          const imageFileName = parts[parts.length - 1]; // Lấy phần cuối cùng của mảng là tên tệp hình ảnh
          // Nối tên tệp hình ảnh với tiền tố 'lesson_img/' để tạo publicId
          const publicId = `lesson_img/${imageFileName.split('.').slice(0, -1).join('.')}`;
  
          // Sử dụng phương thức uploader.destroy của Cloudinary để xóa hình ảnh bằng publicId
          cloudinary.uploader.destroy(publicId, function (error, result) {
            if (error) {
              console.error('Xóa hình ảnh không thành công:', error);
            } else {
              console.log('Xóa hình ảnh thành công:', result);
            }
          });
        }
      }
      const updatedData = {
        ...req.body,
        img: filedata ? filedata.path : (product ? product.img : undefined), // Giữ nguyên ảnh cũ nếu không có file mới
      };
  
      const data = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
  
      return res.json({
        message: "Cập nhật thành công",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };
  
  
  export const create = async (req, res) => {
    try {
      const filedata = req.file;
       const { error } = productSchema.validate(
        { ...req.body, img: filedata.path }, // Thêm đường dẫn ảnh vào trường 'img'
        { abortEarly: false }
      );
  
      if (error) {
        if (filedata) cloudinary.uploader.destroy(filedata.filename);
        return res.status(400).json({
          message: error.details.map((err) => err.message),
        });
      }
      const data = await Product.create({ ...req.body, img: filedata.path }); // Thêm đường dẫn ảnh vào dữ liệu sản phẩm
      await category.findByIdAndUpdate(data.categoryId, {
        $addToSet: {
          products: data._id,
        },
      });
      return res.json({
        message: "thêm thành công",
        data: data,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  };

  //lấy sp có giá lớn hơn 0
export const getProductsByPrice = async (req, res) => {
  try {
    // Lấy danh sách sản phẩm có giá lớn hơn 0 và populate trường categoryId và rating
    const products = await Product.find({ price: { $gt: 0 } }) // Sử dụng điều kiện $gt (greater than) để lấy sản phẩm có giá lớn hơn 0
      .populate('categoryId', 'name')
    return res.json({
      message: 'Lấy dữ liệu thành công',
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
//lấy sp có giá = 0
export const getFreeProducts = async (req, res) => {
  try {
    // Lấy danh sách sản phẩm có giá bằng 0 và populate trường categoryId và rating
    const freeProducts = await Product.find({ price: 0 }) // Sử dụng điều kiện price: 0 để lấy sản phẩm có giá bằng 0
      .populate('categoryId', 'name')
    return res.json({
      message: 'Lấy dữ liệu thành công',
      data: freeProducts,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

