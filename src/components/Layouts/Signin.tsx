import { Link } from "react-router-dom"
import userApi, { useLoginMutation } from '@/Api/userApi';
import { IUsers } from "@/interface/user";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { UserOutlined, LockOutlined } from '@ant-design/icons'; // Import icons
import { BiLogoGmail } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import "./signin_signup.css"
type FieldType = {
  email?: string;
  password?: string;
};
const Signin = () => {
  const [signin, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SET_USER = 'SET_USER';

  function setUser(user: IUsers) {
    return {
      type: SET_USER,
      payload: user
    };
  }

  const onFinish = async (values: IUsers) => {
    try {
      const user = await signin(values).unwrap();
      // Serialize and save user data to local storage
      localStorage.setItem('userInfo', JSON.stringify(user));
      dispatch(setUser(user));
      navigate('/'); // Replace with your success route
      notification.success({
        message: 'Thành công',
        description: 'Đăng nhập thành công.',
      });
    } catch (error) {
      // It's a good practice to clear any potentially stale user data upon login failure
      localStorage.removeItem('user');
      notification.error({
        message: 'Lỗi',
        description: error.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra tài khoản hoặc mật khẩu.',
      });
    }
  };
  return (
    <div className="  flex justify-center bg-custom max-w-7xl mx-auto pb-10">
      <div className="contaiiiner  bg-gradient-to-t  from-white to-yellow-200   bg-opacity-50 ">
        <div className="login-content ">
     
            <Form
              name="basic"
              className="register-formmm" id="register-form"

              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <h2 className="form-title mb-4 w-[300px]">Đăng nhập</h2>
              <Form.Item<FieldType>
                className="form-group"
                name="email"
                rules={[{ required: true, message: 'Bắt buộc phải nhập Email!' }]}
              >
                <Input className="input no-border-radius border rounded-lg border-black input-prefix-spacing input-password w-[300px] mr-[25px]" placeholder="Nhập email của bạn" prefix={<BiLogoGmail />} />

              </Form.Item>

              <Form.Item<FieldType>
                className="form-group"
                name="password"
                rules={[{ required: true, message: 'Hãy nhập mật khẩu' }]}
              >
                <Input.Password className="input no-border-radius border rounded-lg border-black input-prefix-spacing  w-[300px] mr-[25px]" placeholder="Nhập mật khẩu của bạn" prefix={<RiLockPasswordFill />} />
              </Form.Item>

              <Form.Item >
                <Button className="ml-16 text-[20px] w-[140px] h-[50px] bg-yellow-200 border-black"  htmlType="submit">
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>

              </Form.Item>
              <div className=" w-[300px]">
              <a href="/forgotPassword" className="  mt-6 ">Quên Mật Khẩu?</a>
              <div>
            <a href="/signup" className="">Tạo tài khoản ngay</a>
             </div>
              </div>
            </Form>

           
          </div>
        </div>
      </div>
 
  )
}

export default Signin