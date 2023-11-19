import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '@/Api/productApi';
import { useGetCategorysQuery } from '@/Api/categoryApi';

const Addproduct = () => {
    const [addProduct, { isLoading }] = useAddProductMutation();
    const navigate = useNavigate();
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const onFinish = (values:any) => {
        const formData:any = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('img', selectedImageFile); // Thêm tệp ảnh vào formData
        formData.append('description', values.description);
        formData.append('categoryId', values.categoryId);
        formData.append('reducedprice', values.reducedprice);
        formData.append('author', values.author);
        
          
        console.log(formData);
        
        addProduct(formData)
            .unwrap()
            .then(() => navigate('/admin/products'));
            notification.success({
            message: 'Success',
            description: 'Product added successfully!',
        });
    };


    const handleImageChange = (event:any) => {
        const file = event.target.files[0];
        setSelectedImageFile(file);
    };

    const { data:   categoryData } = useGetCategorysQuery();
    const numberPattern = /^[0-9]*$/; 
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm sách</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="Tên sách" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }, { min: 5, message: 'Khóa học ít nhất 3 ký tự' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Ảnh" name="img">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </Form.Item>

                <Form.Item label="Giá sách" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá khóa học!' }, { pattern: numberPattern, message: 'Chỉ được nhập số!' }, ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="reducedprice" name="reducedprice">
                    <Input />
                </Form.Item>

                
                <Form.Item label="Tác giả" name="author">
                    <Input />
                </Form.Item>

                <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }, { min: 10, message: 'Khóa học ít nhất 10 ký tự' }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: 'Vui lòng nhập category!' }]}>
                    <Select>
                        {categoryData?.data.map(({ _id, name }) => (
                            <Select.Option key={_id} value={_id}>
                                {name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isLoading ? 'Đang tải lên...' : 'Thêm'}
                    </Button>
                    <Button
                        className="ml-2 bg-yellow-500 text-white"
                        onClick={() => navigate('/admin/products')}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Addproduct;
