import React, { useState } from 'react';
import { AiOutlineCheck, AiOutlineWechat, AiOutlineCheckCircle, AiFillFileText } from "react-icons/ai"
import { GiTeacher } from "react-icons/gi"
import { PiChalkboardTeacherBold } from "react-icons/pi"
import { CiRepeat } from "react-icons/ci"
import { BsStars } from "react-icons/bs"
import { useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
} from "@/Api/productApi";
import { Link } from "react-router-dom";
const Thong_tin_thanhtoan = () => {
  const backgroundStyle = {
    backgroundImage: 'url(../../../public/img/bg.png)',
  };
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData }: any = useGetProductByIdQuery(idProduct || "");
  
  return (

    <div className="h-screen bg-cover bg-no-repeat bg-fixed " style={backgroundStyle}>
      <div className=" p-24 mx-auto w-[1200px] h-full">
        <div className='text-center text-[30px] font-bold mb-10'>
          <h1 className='text-white '>Mở khóa toàn bộ khóa học</h1>
        </div>
        <div className='grid grid-cols-12 gap-8'>
          <div className='col-span-8'>
            <p className="text-white mb-4">Sở hữu khóa học HTML CSS đầy đủ và chi tiết nhất bạn có thể tìm thấy trên Internet 🙌</p>
            <p className='text-white'>Có tới <span className='text-[#5ebbff]'>hàng trăm bài tập thực hành </span>
              sau mỗi bài học và bạn sẽ được <span className='text-[#5ebbff]'>làm 8 dự án thực tế</span>
              trong khóa học này. Với <span className='text-[#5ebbff]'>1000+ bài học</span>
              (bao gồm video, bài tập, thử thách, flashcards, v.v) sẽ giúp bạn nắm kiến thức nền tảng vô cùng chắc chắn.</p>
            <div className='bg-[#202425] p-4 rounded-lg mt-6 space-y-4 '>
              <p className='ml-2 text-white '>
                Giá bán: <span className='text-[#52eeee] text-[18px] font-bold ml-10'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productData?.data.price)}</span>
              </p>
              <p className='ml-2 border-[1px] text-white border-[#333c6d] border-b-0 border-r-0 border-l-0'>
                Tổng tiền: <span className='text-[#52eeee] text-[18px] font-bold ml-10'>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productData?.data.price)}
                </span>
              </p>

            </div>

            <div className='mt-10 space-x-2 flex text-center  '>
            
              <Link to={`/thanhtoan/${idProduct}`} style={{ width: '100%' }}>
                <button className="bg-gradient-to-b from-[#8951ff] to-[#21a2ff] text-white py-2 px-8 rounded-md font-bold">
                  Thanh toán QR
                </button>
              </Link>
              <Link to="" style={{ width: '100%' }}>
                <button className="bg-gradient-to-b from-[#8951ff] to-[#21a2ff] text-white py-2 px-6 rounded-md font-bold" >
                  Thanh toán Vnpay
                </button>
              </Link>
            </div>



          </div>
          <div className='col-span-4  text-white p-0.5  rounded-lg bg-gradient-to-l from-[#8951ff] to-[#21a2ff]'>
            <div className='bg-[#323c4a] p-4 rounded-lg'>
              <div className='text-center font-bold text-[20px] '> <p className='mb-4'>Bạn sẽ nhận được gì?</p></div>
              <div className="space-y-4">
                <p className="flex items-center">
                  <AiOutlineCheck className="mr-1" />
                  Truy cập toàn bộ khóa
                </p>
                <div className="flex items-center">
                  <GiTeacher className="mr-2" />
                  Hơn 604 bài học
                </div>
                <div className="flex items-center">
                  <PiChalkboardTeacherBold className="mr-2" />
                  Hơn 493 bài tập và thử thách
                </div>
                <div className="flex items-center">
                  <AiFillFileText className="mr-2" />
                  Thực hành 8 dự án thực tế
                </div>
                <div className="flex items-center">
                  <AiOutlineWechat className="mr-2" />
                  Kênh hỏi đáp riêng tư
                </div>
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="mr-2" />
                  Đáp án cho mọi thử thách
                </div>
                <div className="flex items-center">
                  <BsStars className="mr-2" />
                  Cập nhật khóa học trong tương lai
                </div>
                <div className="flex items-center">
                  <CiRepeat className="mr-2" />
                  Mua một lần, học mãi mãi
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Thong_tin_thanhtoan;
