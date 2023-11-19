import React, { useState, useEffect } from 'react';
import { useGetProductByIdQuery, useUpdateProductMutation } from "@/Api/productApi";
import { useGetCategorysQuery } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { Button, Form, Input, Skeleton, Select, Image, notification } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData, isLoading }: any = useGetProductByIdQuery(idProduct || "");
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  useEffect(() => {
    form.setFieldsValue({
      name: productData?.data.name,
      price: productData?.data.price,
      img: productData?.data.img,
      description: productData?.data.description,
      categoryId: productData?.data.categoryId._id,
      reducedprice: productData?.data.reducedprice,
      author: productData?.data.author,
    });
  }, [productData]);

  const { data: categoryData } = useGetCategorysQuery();

  const onFinish = (values) => {
    const formData: FormData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('categoryId', values.categoryId);
    formData.append('reducedprice', values.reducedprice);
    formData.append('author', values.author);

    if (selectedImageFile) {
      formData.append('img', selectedImageFile);
    }
    console.log(formData);

    const productData = {
      _id: idProduct,
      ...values,
    };

    updateProduct({ product: productData, formData: formData })
      .unwrap()
      .then(() => navigate('/admin/products')); // Chuyển hướng sau khi cập nhật
      notification.success({
        message: 'Success',
        description: 'Product edit successfully!',
    });
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImageFile(file);

    // Cập nhật giá trị "img" trong "values" khi chọn tệp tin mới
    form.setFieldsValue({
      ...form.getFieldsValue(),
      img: file, // Sử dụng "file" thay vì giá trị "img" cũ
    });
  };

  const numberPattern = /^[0-9]*$/;

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Sửa khóa học : {productData?.data.name}</h2>
      </header>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên sách"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên khóa học!" },
              { min: 3, message: "Khóa học ít nhất 3 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            name="img"
          >
            <Image
              width={150}
              src={selectedImageFile ? URL.createObjectURL(selectedImageFile) : productData?.data.img}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Form.Item>

          <Form.Item
            label="Giá sách"
            name="price"
            rules={[
              { required: true, message: "Vui lòng nhập giá sách !" },
              // { min: 5, message: "Khóa học ít nhất 5 chữ số" },
              { pattern: numberPattern, message: 'Chỉ được nhập số!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="reducedprice"
            name="reducedprice"
            rules={[
              { required: true, message: "Vui lòng nhập reducedprice!" },
              // { min: 5, message: "Khóa học ít nhất 5 chữ số" },
              { pattern: numberPattern, message: 'Chỉ được nhập số!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả!" },
              { min: 10, message: "Khóa học ít nhất 10 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="author"
            name="author"
            rules={[
              { required: true, message: "Vui lòng nhập tác giả" },
              { min: 3, message: "Khóa học ít nhất 3 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>

          

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              { required: true, message: "Vui lòng nhập category!" },
            ]}
          >
            <Select>
              {categoryData?.data.map(({ _id, name }: Category) => (
                <Select.Option key={_id} value={_id}>
                  {name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" danger htmlType="submit">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Sửa"
              )}
            </Button>
            <Button
              className="ml-2 bg-yellow-500 text-white"
              onClick={() => navigate("/admin/products")}
            >
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditProduct;
