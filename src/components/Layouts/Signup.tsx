import userApi, { useSignUpMutation } from '@/Api/userApi';
import { useNavigate } from "react-router-dom";
import { IUsers } from '@/interface/user';
import React from 'react';
import { Button, Checkbox, Form, Input, Select, notification } from 'antd';
import { Option } from 'antd/es/mentions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import "./signin_signup.css"
import { BiLogoGmail, BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsPhoneFill } from "react-icons/bs";
type FieldType = {
  name?: string;
  email?: string;
  phoneNumber: number;
  password?: string;
  confirmPassword?: string;
};

const Signup = () => {
  const [addsignup, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();
  const onFinish = (values: IUsers) => {
    addsignup(values)
      .unwrap()
      .then((response) => {
        // Kiểm tra nội dung thông điệp trong phản hồi để xác định loại thông báo
        if (response.message.includes("đã tồn tại")) {
          // Nếu thông điệp có chứa "đã tồn tại", hiển thị thông báo lỗi
          console.log(response.message); // Log ra console
          notification.error({
            message: 'Đăng ký thất bại',
            description: response.message,
          });
        } else {
          // Ngược lại, hiển thị thông báo thành công
          console.log(response.message); // Log ra console
          notification.success({
            message: 'Đăng ký thành công',
            description: response.message,
          });
          navigate("/signin");
        }
      })
      .catch((error) => {
        // Ghi ra console thông điệp lỗi
        console.error('Lỗi đăng ký:', error);
        // Hiển thị thông báo lỗi dựa trên phản hồi từ server
        const errorMessage = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
        notification.error({
          message: 'Lỗi',
          description: errorMessage,
        });
      });
  };
  return (
    // andt
    <div className=" flex justify-center bg-custom max-w-7xl mx-auto pb-10">
      <div className="contaiiiner bg-gradient-to-t  from-white to-yellow-200   bg-opacity-50 ">
        <div className="login-content ">


          <Form
            className="register-formmm " id="register-form"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <h2 className="form-title ml-16">Đăng ký</h2>
            <Form.Item<FieldType>
              className="form-group"
              name="name"
              rules={[{ required: true, message: 'Bắt buộc phải nhập tên' }]}
            >
              <Input className="input no-border-radius border rounded-lg border-black input-prefix-spacing input-password w-[300px] mr-4" placeholder="Nhập tên của bạn" prefix={<BiSolidUser />} />

            </Form.Item>

            <Form.Item<FieldType>
              className="form-group"
              name="email"
              rules={[
                { required: true, message: 'Bắt buộc phải nhập Email!' },
                () => ({
                  validator(_, value) {
                    if (!value || /^\S+@\S+\.\S+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Email không được có dấu cách!'));
                  },
                }),
              ]}
            >
              <Input className="input no-border-radius  border rounded-lg border-black  input-prefix-spacing input-password w-[300px] mr-4" placeholder="Nhập email của bạn" prefix={<BiLogoGmail />} />

            </Form.Item>

            <Form.Item<FieldType>
              className="form-group"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Bắt buộc phải nhập số điện thoại!' },
                () => ({
                  validator(_, value) {
                    if (!value || /^(0|\+84)\d*$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Số điện thoại phải bắt đầu bằng số 0 hoặc +84 và không chứa khoảng trắng!'));
                  },
                }),
              ]}
            >
              <Input className="input no-border-radius border rounded-lg border-black   input-prefix-spacing input-password w-[300px] mr-4" placeholder="Nhập số điện thoại của bạn" prefix={<BsPhoneFill />} />

            </Form.Item>

            <Form.Item<FieldType>
              className="form-group"
              name="password"
              rules={[
                { required: true, message: 'Hãy nhập mật khẩu' },
                () => ({
                  validator(_, value) {
                    if (!value || /^\S+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu không được chứa khoảng trắng!'));
                  },
                }),
              ]}
            >
              <Input.Password className="input no-border-radius border rounded-lg border-black  input-prefix-spacing w-[300px] mr-4" placeholder="Nhập mật khẩu của bạn" prefix={<RiLockPasswordFill />} />
            </Form.Item>
            <Form.Item<FieldType>
              className="form-group"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập lại mật khẩu!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu mới mà bạn đã nhập không khớp!'));
                  },
                }),
              ]}
            >
              <Input.Password className="input no-border-radius border rounded-lg border-black  input-prefix-spacing w-[300px] mr-4" placeholder="Nhập mật khẩu của bạn" prefix={<RiLockPasswordFill />} />
            </Form.Item>
            <Form.Item className='mr-4'>
              <Button className=' mt-4 text-[20px] w-[140px] h-[50px] bg-yellow-200 border-black ml-20' htmlType="submit">
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "Gửi"
                )}
              </Button>

            </Form.Item>
          </Form>

          {/* <div className="login-image ml-4">
               <img className="w-[400px] h-[300px] " src="../../../public/img/signup.jpg" alt="" />
                </div> */}
        </div>
      </div>
    </div>

  )
}

export default Signup