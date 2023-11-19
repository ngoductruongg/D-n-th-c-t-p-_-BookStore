import { Link, useNavigate, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./client.css";
import {
  AiOutlineUserAdd,
  AiFillHome,
  AiFillPhone,
  AiOutlineMail,
  AiFillCaretRight,
} from "react-icons/ai";
import { BiSolidCategoryAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useGetProductsQuery } from "@/Api/productApi";
import { IProduct } from "@/interface/products";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { FaRegCircleUser } from 'react-icons/fa6';
import { Button, Drawer, Input, List } from "antd";
import {
  BsFacebook,
  BsGithub,
  BsYoutube,
  BsInstagram,
  BsPinAngleFill,
} from "react-icons/bs";
import { Spin } from "antd";
import { IoHome } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { IUsers } from "@/interface/user";
import { useGetOneUserQuery, useUpdateUserMutation } from "@/Api/userApi";
import { MdConnectWithoutContact } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
type UserType = {
  id: number;
  name: string;
  img: string | number;
  email: string;
  // ... other properties if any
} | null;
const LayoutlClinet = () => {
  const { data: productData, error, isLoading } = useGetProductsQuery();

  const { idUser } = useParams<{ idUser: string }>();
  const { data: DataUser } = useGetOneUserQuery(idUser || "");
  const navigate = useNavigate();

  const [updateUser] = useUpdateUserMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    if (timer) clearTimeout(timer);

    setShowLoading(true); // Hiển thị biểu tượng loading

    const newTimer = setTimeout(() => {
      setDelayedSearchTerm(searchTerm);
      setShowLoading(false); // Ẩn biểu tượng loading sau 1,5 giây
    }, 1500);

    setTimer(newTimer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [searchTerm]);


  // ================ của trường xin đấy đừng động vào ===========================
  const headerClass = "bg-gray-300";
  useEffect(() => {
    const header = document.querySelector(".fixed");

    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          // Kiểm tra xem lớp đã được áp dụng chưa
          const hasClass = header.classList.contains(headerClass);
          if (!hasClass) {
            header.classList.add(headerClass);
          }
        } else {
          header.classList.remove(headerClass);
        }
      };

      // Gọi handleScroll ngay khi effect được gắn kết
      handleScroll();

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [headerClass]);
  // =============================================================================

  const [userInfo, setUserInfo] = useState<UserType>(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // Xóa tất cả dữ liệu từ localStorage
    localStorage.clear();

    // Navigate to the home page
    navigate('/', { replace: true });

    // Tải lại trang
    window.location.reload(); // This might not be necessary if you're navigating away
  };
  return (
    <>
      {/* <!-- HEADER --> */}
      <header className={`bg-gradient-to-r from-[#d0ccd0] to-[#605856]
       mx-auto flex justify-around items-center py-6 px-12 mb-4 
       mt-0 transition-all w-[100%] z-50 fixed ${headerClass}  `}>
        <div className=" ">
          <h2 className="text-[35px] font-extrabold text-white">NDT.com</h2>
        </div>
       
        <div>
          <div className="relative ">
            <Input
              className="  w-[700px] rounded-full border  text-sm py-3"
              placeholder="Bạn đang tìm gì?"
              prefix={
                showLoading ? (
                  <Spin className="text-red-200"/>
                ) : (
                  <SearchOutlined className="  text-[#605856] text-[20px] mr-2 rounded-lg p-2" />

                )
              }
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />

            <div className="absolute bg-white mt-2 w-full rounded-lg z-10  ">

              {/* Hiển thị kết quả tìm kiếm của sản phẩm */}
              {delayedSearchTerm &&
                productData &&
                productData.data.filter((val) =>
                  val.name
                    .toLowerCase()
                    .includes(delayedSearchTerm.toLowerCase())
                ).length > 0 && (
                  <>
                    <p className="text-xl ml-2">Sản phẩm</p>
                    {productData.data
                      .filter((val) => {
                        if (
                          val.name
                            .toLowerCase()
                            .includes(delayedSearchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                      })
                      .map((product: IProduct) => (
                        <div
                          key={product._id}
                          className="bg-white rounded-lg hover:border hover:shadow-md overflow-hidden  hover:scale-105 transition ease-out duration-500"
                        >
                          <Link to={`/detail/${product._id}`} className=" ">
                            <div className="p-2 flex ">
                              <img
                                className="w-[50px] h-[50px] rounded-full"
                                src={product.img}
                                alt=""
                              />
                              <h2 className="text-base text-center  ml-2">
                                {product.name}
                              </h2>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </>
                )}
              {delayedSearchTerm &&
                productData &&
                productData.data.filter((val) =>
                  val.name
                    .toLowerCase()
                    .includes(delayedSearchTerm.toLowerCase())
                ).length === 0 && (
                  <p className="p-4">
                    Không tìm thấy sản phẩm cho từ khóa bạn tìm.
                  </p>
                )}



            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <div>
           <a href="/cart"><FaCartPlus className="text-[30px] text-white "/></a> 
            </div>
            <div className="items-center space-x-4 flex hidden lg:flex">
          {userInfo ? (
            <>
              <div
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="text-center">

                  <FaRegCircleUser
                    style={{ fontSize: "32px", marginLeft: "15px",color:"white" }}
                  />
                </div>
                {isMenuOpen && (
                  <div
                    className="border rounded-xl w-[150px] "
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Link to="/changePassword">
                      {" "}
                      <div
                        className=" hover:bg-gradient-to-t from-[#d0ccd0] to-[#605856] hover:text-white  rounded-xl"
                        style={{ padding: "10px 20px" }}
                      >
                        Đổi mật khẩu
                      </div>
                    </Link>
                    <button
                      className=" hover:bg-gradient-to-t from-[#d0ccd0] to-[#605856]  hover:text-white   rounded-xl"
                      style={{ padding: "10px 37px" }}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
                <span className="text-white font-bold">{userInfo ? (userInfo.data ? userInfo.data.name : userInfo?.userData ? userInfo.userData.name : '') : ''}</span>


              </div>
            </>
          ) : (
            <>

              <Link to="signin">
                <button className="bg-white text-black px-4 py-2 rounded-[10px] hover:bg-[#d0ccd0]  ">
                  Đăng nhập
                </button>
              </Link>
              <Link to="signup">
                <button className="bg-white text-black px-6 py-2 rounded-[10px] hover:bg-[#d0ccd0]">
                  Đăng Ký
                </button>
              </Link>
            
            </>
          )}

        </div>
            </div>
      
      </header>


      {/* =========================== */}
      <div className="flex ">
        <nav className="text-lg text-[#000000] font-bold py-40 bg-white ">
          <ul className=" px-3 space-y-3 ">
            <li className="hover:bg-gradient-to-r from-[#d0ccd0] to-[#605856]  p-2 pl-3 rounded-lg  hover:text-white">
              <IoHome className="  text-[20px]"/>
              <a href="/" className=" text-[10px]">
                Home
              </a>
            </li>

            <li className=" hover:bg-gradient-to-r from-[#d0ccd0] to-[#605856]   p-2 pl-3 rounded-lg  hover:text-white ">
              
              <BiSolidCategoryAlt  className="  text-[20px] "/>
              <a href="/danhmuc" className="text-[10px]">
                Category

              </a>
            </li>


            <li className="hover:bg-gradient-to-r from-[#d0ccd0] to-[#605856]  p-2 pl-3 rounded-lg  hover:text-white">
              <MdConnectWithoutContact  className=" text-[20px]"/>
              <a href="/contact" className=" text-[10px]">
                Contact
              </a>
            </li>
          </ul>

        </nav>
        <Outlet />
      </div>

      {/* =========================== */}

      <footer className=" text-white bg-cover bg-center bg-gradient-to-b from-[#d0ccd0] to-[#605856]  py-10 sm:py-12 md:py-16 lg:py-20 mt-60">
        <div className="container mx-auto">
          <div className=" ml-[10%] flex  flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-12 md:space-x-16 lg:space-x-20 text-black ">
            <div className="w-full sm:w-1/4 md:w-1/6 ">
              <p className="text-xl font-bold">Thông tin liên hệ</p>
              <p className="text-sm mt-4 flex items-center">
                <AiFillHome className=" text-[14px] mr-1" />
                Address: Số 1 Phố Trịnh Văn Bô
              </p>
              <p className="text-sm flex items-center">
                <AiOutlineMail className=" text-[13px] mr-1" />
                Email: ndt@gmail.com
              </p>
              <p className="text-sm flex items-center">
                <AiFillPhone className="text-[15px] mr-1" />
                Hotline: 1800000
              </p>
              <p className="text-xl mt-2 font-bold">
                Đăng ký để nhận thông tin mới nhất
              </p>
              <form className="mt-4">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="w-[200px] py-2 px-3 rounded-sm focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  type="submit"
                  className="mt-2 ml-5 bg-black hover:bg-yellow-500 text-white py-2 px-4 rounded-full"
                >
                  Đăng ký
                </button>
              </form>
            </div>

            <div className="w-full sm:w-1/4 md:w-1/6 ">
              <p className="text-xl font-bold">Dịch vụ</p>
              <p className="mt-4 text-sm">
                Điều khoản dịch vụ
              </p>
              <p className="text-sm">
                Chính sách bảo mật thông tin cá nhân
              </p>
              <p className="text-sm">
              Hệ thống trung tâm - nhà sách
              </p>
              
            </div>

            <div className="w-full sm:w-1/4 md:w-1/6 ">
              <p className="text-xl font-bold">Hỗ trợ</p>
              <p className="mt-4 text-sm">
              Chính sách đổi - trả - hoàn tiền
              </p>
              <p className="text-sm">
              Chính sách bảo hành - bồi hoàn
              </p>
              <p className="text-sm">
              Chính sách vận chuyển
              </p>
              <p className="text-sm">
              Chính sách khách sỉ
              </p>
              <p className="text-sm">
              Phương thức thanh toán và xuất HĐ
              </p>
            </div>

            <div className="w-full sm:w-1/4 md:w-1/6 ">            
              <p>Thanh toán qua ngân hàng nội địa</p>
              <div className="flex mt-2">
                <img className="w-20 h-10 mt-2 mr-2" src="../../../public/img/vcb.png" alt="" />
                <img className="w-20 h-10 mt-2 mr-2" src="../../../public/img/mb.png" alt="" />
                <img className="w-20 h-10" src="../../../public/img/vietin.png" alt="" />
              </div>
              <div className="flex">
                <img className="w-20 mr-2" src="../../../public/img/tech.png" alt="" />
                <img className="w-20 h-4 mt-6 mr-2" src="../../../public/img/agr.png" alt="" />
                <img className="w-20 h-4 mt-5 mr-2" src="../../../public/img/bidv.png" alt="" />
              </div>
            </div>
          </div>
          <div className="max-w-6xl mt-10 space-y-4  pl-20 mx-auto grid grid-cols-4">
        
               
                <img className="w-20 h-10" src="../../../public/img/vc1.png" alt="" />
                <img className="w-20 h-10" src="../../../public/img/vc2.png" alt="" />
                <img className="w-20 h-10" src="../../../public/img/vc3.png" alt="" />
                <img className="w-20 h-10" src="../../../public/img/vc4.png" alt="" />
                <img className="w-20 h-10" src="../../../public/img/vc5.png" alt="" />
                <img className="w-20 h-10" src="../../../public/img/vc6.png" alt="" />
                <img className="w-20 h-10" src="../../../public/img/vc7.png" alt="" />
                
                <img className="w-20 h-10" src="../../../public/img/vc9.png" alt="" />
          </div>
        </div>
        
      </footer>

    </>
  );
};

export default LayoutlClinet;
