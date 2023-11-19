import { useAddCategoryMutation } from "@/Api/categoryApi";
import { IProduct } from "@/interface/products";
import { Form, Button, Input, notification } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
type FieldType = {
    name: string;
};
const Addcategory = () => {
    const [addCategory, { isLoading }] = useAddCategoryMutation();
    const navigate = useNavigate();
    const onFinish = (values: IProduct) => {
        addCategory(values)
            .unwrap()
            .then(() => navigate("/admin/categorys"));
            navigate('/admin/categorys');
            notification.success({
            message: 'Success',
            description: 'Product added successfully!',
        });
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm danh mục</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên sản category"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập category!" },
                        { min: 5, message: "Sản phẩm ít nhất 5 ký tự" },
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
                       
                        className="ml-2  bg-yellow-500 text-white"
                        onClick={() => navigate("/admin/products")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Addcategory;