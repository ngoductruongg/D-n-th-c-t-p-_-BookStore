import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/Api/productApi";
import { useGetCategorysQuery } from "@/Api/categoryApi";
import { Category } from "@/interface/categorys";
import { IProduct } from "@/interface/products";
import { Button, Form, Input, Skeleton, Select } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneUserQuery, useUpdateUserMutation } from "@/Api/userApi";
import { IUsers } from "@/interface/user";
type FieldType = {
  name: string;
  email: number | string;
  img: string | number;
  phoneNumber: number
};
const EditUser = () => {
  const { idUser } = useParams<{ idUser: string }>();
  const { data: productData, isLoading } = useGetOneUserQuery(idUser || "");
  const [updateProduct] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  console.log("pro: ",productData);

  useEffect(() => {
    form.setFieldsValue({
      name: productData?.name,
      email: productData?.email,
      img: productData?.img,
      phoneNumber: productData?.phoneNumber,
    });
  }, [productData]);

  // const dataSource = categoryData?.map(({ _id, name,email }: IUsers) => ({
  //     key: _id,
  //     name,
  //     email,
  // }))

  const onFinish = (values: IUsers) => {
    updateProduct({ ...values, _id: idUser})
      .unwrap()
      .then(() => navigate("/admin/user"));
  };


  return (
    <div>
      <header className="mb-4">
        <h2 className="font-bold text-2xl">
          Sửa Lại Người Dùng : {productData?.name}
        </h2>
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
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên khóa học!" },
              { min: 3, message: "khóa học ít nhất 3 ký tự" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập giá khóa học!" },
             
             
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item<FieldType>
            label="Image"
            name="img"
            rules={[
              { required: true, message: "Vui lòng nhập !" },
             
             
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập phone Number!" },
         
            ]}
          >
            <Input />
          </Form.Item>
          {/* 
                    <Form.Item label="category" name="categoryId"
                    rules={[
                        { required: true, message: "Vui lòng nhập category!" },                   
                    ]}
                    >
                        <Select>
                            {categoryData?.data.map(({ _id, name }: Category) => (
                                console.log(name),
                                <Select.Option key={_id} value={_id}>
                                    {name}
                                </Select.Option>
                            ))}
                        </Select>

                    </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" danger htmlType="submit">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Thêm"
              )}
            </Button>
            <Button
              className="ml-2 bg-yellow-500 text-white "
              onClick={() => navigate("/admin/user")}
            >
              Quay lại
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditUser;