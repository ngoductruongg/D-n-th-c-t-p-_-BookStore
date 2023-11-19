import { useGetCategorysQuery } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { useAddOrderDetailMutation, useAddProductMutation, useGetProductByIdQuery, useGetProductsQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { Form, Button, Input,Select } from "antd";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
type FieldType = {
    content: string;
    price: number | string;
    img: string;
    description:string;
    categoryId: string;
    PaymentDetails: string | null
};
const Orderdetail = () => {
    const [addOrderDetail, { isLoading }] = useAddOrderDetailMutation();
    const navigate = useNavigate();
    const onFinish = (values: IProduct) => {
      addOrderDetail(values)
            .unwrap()
            .then(() => navigate("/admin/products"));
    };
    
    const { data:  categoryData } = useGetCategorysQuery();
    console.log(categoryData?.data);
    const {data: productData } = useGetProductsQuery();

        const numberPattern = /^[0-9]*$/; 

    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm Thông Tin Đơn Hàng</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                    <Form.Item<FieldType>
                    label="Nội Dung Thanh Toán"
                    name="content"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên khóa học!" },
                        { min: 5, message: "khóa học ít nhất 3 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item<FieldType> label="ảnh"  name="img"
                rules={[
                    { required: true, message: "Vui lòng nhập img khóa học!" },  
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Giá khóa học" name="price"
                rules={[
                    { required: true, message: "Vui lòng nhập giá khóa học!" },
                    { min: 5, message: "khóa học ít nhất 5 chữ số" },
                    { pattern: numberPattern, message: 'Chỉ được nhập số!' },  
                ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType> label="Nội Dung Thanh Toán" name="PaymentDetails"
            
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="mô tả"
                    name="description"
                    rules={[
                        { required: true, message: "Vui lòng nhập mô tả!" },
                        { min: 10, message: "khóa học ít nhất 10 ký tự" },
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item label="category" name="categoryId"
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

export default Orderdetail;