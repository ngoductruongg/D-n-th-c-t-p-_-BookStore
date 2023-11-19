import React, { useEffect, useState, useRef } from "react";
import { useGetProductByIdQuery, useGetProductsQuery } from "@/Api/productApi";
import { useNavigate, useParams } from "react-router-dom";

import { useGetRatingsQuery } from "@/Api/ratingApi";
import { RaceBy } from '@uiball/loaders'
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Modal, Button, Rate, Input, Form } from "antd";
import { IoCloseOutline } from "react-icons/io5";
import { useGetOneUserQuery } from "@/Api/userApi";
import { useAddCommentMutation, useGetCoursesForIdproductQuery } from "@/Api/CommentApi";

const ProductDetail = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const idUser = userInfo.userData?._id || "";
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: ratingData } = useGetRatingsQuery()
  console.log("rating", ratingData)
  const { data: productData, isLoading: productIsLoading, isError } = useGetProductByIdQuery(idProduct || "");
  const { data: productDataAll } = useGetProductsQuery();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [courseStatusData, setCourseStatusData] = useState("");

  const { data: userData } = useGetOneUserQuery(idUser);
  const [addComment] = useAddCommentMutation();
  const [commentadd, setComment] = useState(""); // State để lưu giá trị của input comment
  const { data: commentData } = useGetCoursesForIdproductQuery(idProduct);
  const handleCommentChange = (event) => {
    setComment(event.target.value); // Cập nhật giá trị comment mỗi khi người dùng nhập vào input
  };
  const isUserLoggedIn = Boolean(idUser);


  const handleCommentSubmit = async () => {
    try {
      // Sử dụng mutation để thêm comment vào API
      const response = await addComment({
        userId: idUser,
        nameuser: userData?.name,
        productId: idProduct,
        content: commentadd
      });
      // Sau khi gửi comment, có thể cần cập nhật giao diện hoặc làm những công việc khác
      setComment('');
    } catch (error) {
      console.error("Lỗi khi thêm comment:", error);
    }
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  const [modalVisible, setModalVisible] = useState(true);
  const [rating, setRating] = useState(0); // Đánh giá ban đầu là 0
  const [feedback, setFeedback] = useState("");
  const handleFeedbackChange = (event: any) => {
    setFeedback(event.target.value);
  };
  const { TextArea } = Input;
  const handleSendRating = async () => {
    try {
      // Tạo một đối tượng gửi đánh giá
      const ratingData = {
        productId: idProduct,
        rating: rating,
        userId: idUser,
        feedback: feedback,
      };
      console.log("Dữ liệu gửi từ máy khách khi gửi đánh giá:", ratingData);
      const response = await fetch("http://localhost:8088/api/rating/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });
      if (response.ok) {
        // Xử lý khi gửi đánh giá thành công
        console.log("Gửi đánh giá thành công!");
        setModalVisible(false);
      } else {
        // Xử lý khi có lỗi
        alert('Vui lòng đánh giá và nhận xét');
        console.error("Lỗi khi gửi đánh giá.");
      }
    } catch (error) {
      // Xử lý khi có lỗi
      console.error("Lỗi khi gửi đánh giá: ", error);
    }
  };

  const [showRatingForm, setShowRatingForm] = useState(false);

  const handleShowRatingForm = () => {
    setShowRatingForm(true);
  };

  const handleHideRatingForm = () => {
    setShowRatingForm(false);
  };
  const viewMoreLinkRef = useRef(null);
  const popupRef = useRef(null);

  const togglePopup = () => {
    const popup = popupRef.current;
    if (popup) {
      popup.classList.toggle('hidden');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-[#d0ccd0] to-[#605856]">
        <RaceBy size={100} lineWeight={6} speed={1.4} color="white" />
        <div className="mt-2 text-black font-medium" style={{ color: 'white' }}>Loading</div>
      </div>
    );
  }


  const countRatings = () => {
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    ratingData?.data
      ?.filter((rating) => rating.productId === idProduct)
      .forEach((rating) => {
        ratingCounts[rating.rating] += 1;
      });

    return ratingCounts;
  };

  const ratings = countRatings();




  return (
    <div className=" pt-[88px] bg-white relative max-w-7xl mx-auto">
      <div className="bg-[#D2E6E4]  h-[106px] w-full absolute top-0 "></div>
      <div className="max-w-7xl mx-auto">
        <div className="rounded-t-lg py-10 px-4 mt-10 w-[1000px] bg-gray-200">
          <div className="grid grid-cols-10 gap-8 pl-5">
            <div className="col-span-4">
              <img
                src={productData?.data.img}
                alt={productData?.data.name}
                className="w-[300px] h-[400px] object-cover rounded-t-lg transform group-hover:opacity-80 transition-opacity rounded-lg"
              />
            </div>
            <div className="col-span-6">
              <h2 className="font-bold text-[30px]">{productData?.data.name}</h2>
              <h2 className="">Nhà cung cấp: <span className="text-blue-600">AZ Việt Nam</span></h2>
              <h2 className=" ">Tác giả: <span className="font-bold">{productData?.data.author}</span></h2>
              <h2 className=" ">Nhà xuất bản: <span className="font-bold">Thế giới</span></h2>
              <h2 className=" ">Mô tả: {productData?.data.description}</h2>
              <p className="  ">Giá: <span className="text-red-700 text-[40px] my-10 font-bold"> {productData?.data.price} đ</span></p>
              <h2 className=" ">Thời gian giao hàng: 3-5 ngày</h2>
              <h2 className="">
                Chính sách đổi trả{" "}
                <span
                  ref={viewMoreLinkRef}
                  className="text-blue-500 cursor-pointer ml-4"
                  onClick={togglePopup}
                >
                  xem thêm
                </span>
              </h2>

              <div
                ref={popupRef}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg rounded-lg hidden w-[800px]"
              >
                <p>
                  (*) Lưu ý:
                  - Đối với thẻ Visa/ Master/ JCB,  số tiền hoàn sẽ được ngân hàng chuyển vào tài khoản quý khách dao động 1-3 tuần làm việc (tùy theo chính sách của từng ngân hàng).
                  - Ngày làm việc không bao gồm thứ 7, chủ nhật và ngày lễ.
                  Đối với những đơn hàng trả hàng hoàn tiền:
                  Thời gian hoàn tiền được bắt đầu tính kể từ thời điểm Fahasa.com nhận được hàng hoàn trả và xác nhận với quý khách về việc hàng hoàn trả đáp ứng các điều kiện trả hàng được quy định tại chính sách này. Thời gian hoàn tiền tuân thủ theo quy định tại Mục 6 này.
                  Đối với các đơn hàng hoàn tiền, hình thức thanh toán của quý khách là tiền mặt (COD): Fahasa.com sẽ hoàn tiền qua tài khoản Ngân hàng do quý khách chỉ định.
                  Trong trường hợp đã quá thời gian trên quý khách chưa nhận được tiền hoàn, vui lòng liên hệ ngân hàng phát hành thẻ hoặc liên hệ bộ phận Chăm sóc khách hàng của Fahasa.com .
                  Nếu cần hỗ trợ thêm bất kì thông tin nào, Fahasa nhờ quý khách liên hệ trực tiếp quahotline 1900636467để được hỗ trợ nhanh chóng.
                  Chính sách sẽ được áp dụng và có hiệu lực từ ngày01/08/2022
                </p>
                <button onClick={togglePopup} className="mt-4 px-4 py-2 bg-gray-300 rounded-lg">
                  Đóng
                </button>
              </div>
              <div>
                <h2 className="font-bold">Đánh giá</h2>
                <div>

                  <p className="flex "> {ratings[1]} <span className="flex items-center pl-2">đánh giá 1  <FaStar className="text-yellow-400" /></span> </p>
                  <p className="flex "> {ratings[2]} <span className="flex items-center pl-2">đánh giá 2  <FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /></span> </p>
                  <p className="flex "> {ratings[3]} <span className="flex items-center pl-2">đánh giá 3  <FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /></span> </p>
                  <p className="flex "> {ratings[4]} <span className="flex items-center pl-2">đánh giá 4  <FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /></span> </p>
                  <p className="flex "> {ratings[5]} <span className="flex items-center pl-2">đánh giá 5  <FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /><FaStar className="text-yellow-400" /></span> </p>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-t-lg py-24 px-10 mt-10 w-[1000px] bg-gray-200">
          <h2 className="text-[40px] font-bold">Thông tin sản phẩm</h2>
          <div className="flex space-x-64">
            <div>
              <h2>Độ Tuổi</h2>
              <h2>Tên Nhà Cung Cấp</h2>
              <h2>Tác giả</h2>
              <h2>Người Dịch</h2>
              <h2>NXB</h2>
              <h2>Năm XB</h2>
              <h2>Ngôn Ngữ</h2>
              <h2>Trọng lượng (gr)</h2>
              <h2>Kích Thước Bao Bì</h2>
              <h2>Số trang</h2>
              <h2>Hình thức</h2>
            </div>
            <div>

              <h2>	16+</h2>
              <h2>Nhà Xuất Bản Kim Đồng</h2>
              <h2>	Ao Jyumonji, Eiri Shirai</h2>
              <h2>Hồ Trung Đức</h2>
              <h2>Kim Đồng</h2>
              <h2>2023</h2>
              <h2>	Tiếng Việt</h2>
              <h2>870</h2>
              <h2>	19 x 13 x 4 cm</h2>
              <h2>	752</h2>
              <h2>	Bìa mềm</h2>
            </div>
          </div>
        </div>


        <div className="rounded-t-lg  px-10 w-[1000px] mx-auto">

          {userInfo.userData ? (<Form
            title=""
            open={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            footer={null}
            maskClosable={false}
          // closable={false}
          >
            <div className="">
              <div className="w-14 flex justify-center"></div>

              <h4 className="text-xl flex items-center justify-center mt-10">
                Hãy đánh giá cho quyển sách này
              </h4>
              <Rate
                className="text-3xl flex items-center justify-center"
                onChange={(value) => setRating(value)}
                value={rating}
              />
              <div className="">
                <h4 className="my-2 text-sm">Hãy đóng góp ý kiến cho chúng tôi</h4>
                <TextArea
                  rows={6}
                  value={feedback}
                  onChange={handleFeedbackChange}
                  className="w-[1000px]"
                />
              </div>
              <div className="flex justify-between mt-3">

                <button
                  onClick={handleSendRating}
                  className="px-10 py-2 text-white rounded-md transition duration-300 
                  bg-gradient-to-t from-[#d0ccd0] to-[#605856] hover:bg-gradient-to-r 
                  hover:from-[#605856] hover:to-[#d0ccd0] hover:rounded-full font-medium"
                  style={{
                    backgroundColor: "transparent" /* Đặt màu nền trong suốt */,
                    color: "#f6f7f9" /* Mã màu phông */,
                    borderRadius: "18px" /* Góc bo tròn ban đầu */,
                    fontSize: "16px",
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </Form>
          ) : (
            <div><p>vui lòng đăng nhập để đánh giá</p></div>
          )}


        </div>




        <div className="mt-4">
          {isUserLoggedIn && (
            <div className="flex items-start space-x-2 mb-6 ">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{userData?.name}</p>
              </div>
            </div>
          )}
          {isUserLoggedIn && (
            <>
              <input
                className="mt-2 w-full h-10 rounded-lg border-2 border-gray-300 px-4"
                placeholder="Viết bình luận của bạn..."
                value={commentadd}
                onChange={handleCommentChange}
              />
              <div className="mt-4">
                <button
                  className="bg-gradient-to-t from-[#d0ccd0] to-[#605856] text-white font-semibold py-2 px-2 rounded-md"
                  onClick={handleCommentSubmit}
                >
                  Gửi bình luận
                </button>
              </div>
            </>
          )}

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
            {commentData?.map((comment) => (
              <div key={comment._id} className="border p-4 mb-4">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png"
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{comment?.nameuser}</p>
                    <p>{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;