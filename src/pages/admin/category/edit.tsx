import { useGetCategoryByIdQuery,useUpdateCategoryMutation } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { Button, Form, Input, Skeleton, notification } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
type FieldType = {
    name: string;
};
const Editcategory = () => {
    const { idCategory } = useParams<{ idCategory: string }>();
    console.log(idCategory);
    
    const { data: categoryData, isLoading } = useGetCategoryByIdQuery(idCategory|| "");
    const [updateCategory] = useUpdateCategoryMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
   console.log(categoryData);
   
    useEffect(() => {
        form.setFieldsValue({
            name: categoryData?.data.name,
        });
    }, [categoryData]);
    const onFinish = (values: Category) => {
        updateCategory({ ...values, _id: idCategory })
            .unwrap()
            .then(() => navigate("/admin/categorys"));
            navigate('/admin/categorys');
            notification.success({
            message: 'Success',
            description: 'Product edit successfully!',
    })
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Sửa danh mục : {categoryData?.data.name}</h2>
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
                    <Form.Item<FieldType>
                        label="Tên categrory"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên category!" },
                            { min: 5, message: "Sản phẩm ít nhất 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item> 
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" danger htmlType="submit">
                            {isLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                "Thêm"
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

export default Editcategory;