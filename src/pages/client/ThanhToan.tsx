import React, { useState, useEffect } from 'react';
import "./../../css/index.css" 
import {FaMapMarkedAlt} from "react-icons/fa";
import {BiLogoGmail} from "react-icons/bi";
import {AiOutlinePhone} from "react-icons/ai";
import {useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
} from "@/Api/productApi";

const thanhtoan = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const [userInfo, setUserInfo] = useState(null);
  const { data: productData }:any = useGetProductByIdQuery(idProduct || "");
  const [seconds, setSeconds] = useState(300); // 5 minutes = 300 seconds
  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }
  }, [seconds]);
  const formatTime = (time:any) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  useEffect(() => {
    // Lấy thông tin người dùng từ Local Storage khi trang tải
    const savedUser = localStorage.getItem("userInfo");
    if (savedUser) {
      setUserInfo(JSON.parse(savedUser));
    }
  }, []);
console.log(productData.data);

  return (
    <div className=" bg-[#272a31] w-full">
    <div className="mx-auto  h-[3000px]">
    <div className="grid grid-cols-12">
    <div className='col-span-3 p-4 text-white border-r-2 h-[3000px] border-[#333c6d] border-t-0 border-b-0 border-l-0'>
      <h2 className='font-bold'>Đang chờ thanh toán</h2>
          <div className='border-b-2 border-[#333c6d] border-t-0 border-r-0 border-l-0'>
              <div className="flex space-x-2">
              <span className="text-4xl animate-blink-first">.</span>
              <span className="text-4xl animate-blink-second">.</span>
              <span className="text-4xl animate-blink-third">.</span>
            </div>
                <div className='text-center'>
                <p className="text-[30px]">{formatTime(seconds)}</p>
                </div>
        </div>
        <div className='border-b-2 border-[#333c6d] border-t-0 border-r-0 border-l-0 space-y-2'>
              <div className='mt-2'>
                <p>Người mua: <span className='text-[#fa8c16] '> {userInfo?.userData.name}</span></p>
                <h3>Tên khóa học:</h3>
                <p>{productData?.data.name}</p>
                <p>noi dung thanh toan {productData?.data.paymentContent}</p>
              </div>
              <div>
                <h3>Mã đơn hàng</h3>
                <p className='text-[#fa8c16] mb-2'>F8C1FNE8</p>
              
              </div>
        </div>
        <div className='mt-4 space-x-1.5 border-b-2 border-[#333c6d] border-t-0 border-r-0 border-l-0 pb-4'>
              <input className='bg-[#323c4a] p-1.5 rounded-lg' type="text" placeholder='Nhập mã khuyễn mãi'/>    
              <div className="inline-block bg-gradient-to-r from-[#34aadc] to-[#bb86fc] p-0.5 rounded-lg">
              <button className="bg-[#202425] px-1 py-1 rounded-lg">
                  ÁP DỤNG
              </button>
              </div>
        </div>
        <div>
              <p className='mt-3 mb-3'>Chi tiết thanh toán:</p>
              <div  className='bg-[#202425] rounded-lg'>
              <p className='p-2'>
                <p className='ml-2'>
                Giá bán: <span className='text-[#52eeee] text-[18px] font-bold ml-10'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productData?.data.price)}</span></p> </p>
              
              <p className='p-2 ml-2 mr-2 border-t-2 border-[#333c6d] border-b-0 border-r-0 border-l-0'>Tổng tiền: <span className='text-[#52eeee] text-[20px] font-bold ml-6'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(productData?.data.price)}</span></p>
             
              </div>
        </div>
    </div>
    <div className='col-span-9  text-white p-4'>
      <h2  className='mb-4 font-bold'>Chuyển khoản bằng QR</h2>
      <div className='flex space-x-4 my-4'>
        <div>
          <img className='w-[100px] h-[100px] rounded-lg' src="../../../public/img/qr.jpg" alt="" />
        </div>
        <div>
          <p>Bước 1: Mở app ngân hàng và quét mã QR. <br />
          Bước 2: Đảm bảo nội dung chuyển khoản là <span className='text-[#fa8c16]'> F8C1BTQP.</span>  <br />
          Bước 3: Thực hiện thanh toán.</p>
        </div>
      </div>
      <h2 className='mb-4 font-bold'>Chuyển khoản thủ công</h2>
      <div className='grid grid-cols-2 gap-2'>
        <div className='bg-[#202425] h-[60px] p-2 rounded-lg '>
          <p className='text-[10px] mb-2 text-[#fffefea6]'>Số tài khoản</p> 
          <p>9353538222</p>
        </div>
        <div className='bg-[#202425] h-[60px] p-2 rounded-lg '>
          <p className='text-[10px] mb-2 text-[#fffefea6]'>Tên tài khoản</p> 
          <p>Nguyễn Duy Anh</p>
        </div>
        <div className='bg-[#202425] h-[60px] p-2 rounded-lg '>
          <p className='text-[10px] mb-2 text-[#fffefea6]'>Nội dung</p> 
          <p className='text-[#fa8c16]'>F8C1FNE8</p>
        </div>
        <div className='bg-[#202425] h-[60px] p-2 rounded-lg '>
          <p className='text-[10px] mb-2 text-[#fffefea6]'>Chi nhánh</p> 
          <p>9353538222</p>
        </div>
      </div>
      <div className='space-y-3'>
      <p className='font-bold text-[25px] mt-2'>Lưu ý</p>
      <p>Tối đa 5 phút sau thời gian 
      chuyển khoản, nếu hệ thống không phản hồi vui lòng liên hệ ngay bộ phận hỗ trợ của F8.</p>
      <p className='flex gap-2'>  <AiOutlinePhone className="mt-1"/>0246.329.1102</p>
      <p className='flex gap-2'>  <BiLogoGmail className="mt-1"/>contact@fullstack.edu.vn</p>
      <p className='flex gap-2'>  <FaMapMarkedAlt className="mt-1"/>Số 11D, lô A10, khu đô thị Nam Trung Yên, Phường Yên Hòa, Quận Cầu Giấy, TP. Hà Nội</p>
      </div>
    
    </div>
    </div>
    </div>
    </div>
  )
}

export default thanhtoan