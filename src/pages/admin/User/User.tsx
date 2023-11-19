// import { useGetProductsQuery,useRemoveProductMutation } from "@/Api/productApi";
import {
  Table,
  Skeleton,
  Popconfirm,
  Alert,
  Button,
  Form,
  Select,
  Input,
  Image,
} from "antd";
import { Link } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { useDeleteUserMutation, useGetAllUserQuery } from "@/Api/userApi";
import { IUsers } from "@/interface/user";
import { useState } from "react";
type Props = {};
const User = (props: Props) => {
  const [userName, setUserName] = useState<string>(""); // Sử dụng chuỗi rỗng làm giá trị mặc định
  const [userEmail, setUserEmail] = useState<string>(""); // Sử dụng chuỗi rỗng làm giá trị mặc định
  const [filteredDataSource, setFilteredDataSource] = useState<IUsers[]>([]);

  const handleSearch = () => {
    const filteredData = productUser?.filter((user: IUsers) => {
      const nameMatch = user?.name?.toLowerCase().includes(userName.toLowerCase());
      // const EmailPhone= user?.email?.toLowerCase().includes(userEmail.toLowerCase());
      return nameMatch ;
    });
  
    setFilteredDataSource(filteredData || []);
  };
  const [form] = Form.useForm();
  const [filter, setFilter] = useState<any>({
    page: 1,
    size: 10,
    orderBy: null,
    ascending: null,
    name: null,
    phone: null,
  });
  const onFinish = (formValues: any) => {
    setFilter({
      ...filter,
      ...formValues,
      name: userName,
      // email: userEmail
    });
    handleSearch(); 
  };
  const handleBulkDelete = () => {
    // Kiểm tra xem có ô trống nào được chọn không
    if (checkedIds.length === 0) {
      return;
    }

    // Hiển thị xác nhận xóa hàng loạt
    Swal.fire({
      title: "Bạn Chắc Chắn Muốn Xóa Những Mục Đã Chọn?",
      text: "Bạn sẽ không thể hủy nếu đồng ý!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng Ý!",
      customClass: {
        popup: "swal2-popup swal2-modal swal2-icon-warning swal2-show",
      },
    }).then((result) => {
      if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
        // Lặp qua các ID đã chọn và xóa chúng
        checkedIds.forEach((id) => {
          removeProduct(id);
        });

        // Sau khi xóa xong, cập nhật lại danh sách checkedIds
        setCheckedIds([]);
      }
    });
  };

  const { data: productUser, isLoading, error } = useGetAllUserQuery<any>();
  console.log("productUser:", productUser);
  const [
    removeProduct,
    { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess },
  ] = useDeleteUserMutation();

  const confirm = (id: number) => {
    Swal.fire({
      title: "Bạn Chắc Chắn Muốn Xóa chứ?",
      text: " Lưu ý : Bạn sẽ không thể hủy nếu đồng ý '!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " Đồng ý ",
      customClass: {
        popup: "swal2-popup swal2-modal swal2-icon-warning swal2-show", // Áp dụng quy tắc CSS trực tiếp
      },
    }).then((result) => {
      if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
        removeProduct(id);
      }
    });
  };

  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    if (checkedIds.includes(id)) {
      // Nếu ID đã tồn tại trong mảng, loại bỏ nó
      setCheckedIds(checkedIds.filter((checkedId) => checkedId !== id));
    } else {
      // Nếu ID không tồn tại trong mảng, thêm nó vào
      setCheckedIds([...checkedIds, id]);
    }
    console.log("đã lấy được id:", id);
  };

  const dataSource = productUser?.map(
    ({ _id, name, email,img, phoneNumber }: IUsers) => ({
      key: _id,
      _id,
      name,
      img,
      email,
      phoneNumber,
    })
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img: string) => <Image src={img} alt="Ảnh" width={125} height={90} />,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "",
      render: ({ key: _id }: any) => {
        return (
          <>
            <div className="flex items-center justify-end mr-auto">
              <Button
                className="w-6 h-6 pl-1 mr-2"
                type="primary"
                danger
                onClick={() => confirm(_id)}
              >
                <IoTrashOutline className="text-l" />
              </Button>
              <Button className="w-6 h-6 pl-1 mr-2" type="primary" danger>
                <Link to={`/admin/user/edit/${_id}`}>
                  <AiOutlineEdit className="text-l" />
                </Link>
              </Button>
              
              <label className="">
                <input
                  type="checkbox"
                  style={{}}
                  onChange={() => handleCheckboxChange(_id)}
                  className="w-6 h-6  mt-1 ml-1 checkbox-style"
                />
              </label>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <header className="mb-4 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Quản Người Dùng</h2>
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
        >
          <Select
            showSearch
            placeholder="Tìm Người Dùng"
            style={{ width: 200 }}
            onChange={(value) => setUserName(value)}
            value={userName}
          >
              {productUser?.slice(0,3).map((user: IUsers) => (
              <Select.Option key={user._id} value={user.name}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
          {/* <Select
            showSearch
            placeholder="nhập email"
            style={{ width: 200 }}
            onChange={(value) => setUserEmail(value)}
            value={userEmail}
          >
              {productUser?.slice(0,3).map((user: IUsers) => (
              <Select.Option key={user._id} value={user.email}>
                {user.email}
              </Select.Option>
            ))}
          </Select> */}
       
          <Form.Item shouldUpdate>
            {() => (
              <Button type="primary" danger htmlType="submit">
                Tìm kiếm
              </Button>
            )}
          </Form.Item>
        </Form>
        <Button
          className=" w-32 h-10"
          type="primary"
          danger
          onClick={handleBulkDelete}
          disabled={checkedIds.length === 0}
        >
          Xóa tất cả
        </Button>
      </header>

      {isRemoveSuccess && (
        <Alert message="Xóa Người Dùng Thành Công" type="success" />
      )}
      {isLoading ? (
        <Skeleton />
      ) : (
        <Table
          dataSource={
            filteredDataSource.length > 0 ? filteredDataSource : dataSource
          }
          columns={columns}
        />
      )}
    </div>
  );
};

export default User;
