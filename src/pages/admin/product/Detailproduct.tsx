import React from "react";
import { useGetProductByIdQuery } from "@/Api/productApi";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";
import { useRemoveLessonMutation } from "@/Api/lesson";
import { notification } from "antd";

export const Detailproduct = () => {
  const { idProduct } = useParams<{ idProduct: string }>();
  const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "");

  const [removeLesson] = useRemoveLessonMutation();
  const confirm = (id: number) => {
    removeLesson(id)
      .unwrap()
      .then((response: any) => {
        console.log("Xóa bài học thành công", response);
        window.location.reload();
      })
      .catch((error: any) => {
        console.error("Lỗi khi xóa bài học", error);
      });
  };
 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>No data found for this product.</div>;
  }

  const lessons = productData.data.lessons || [];
  return (
    <>
     <div className="flex">
     <button className=" bg-yellow-500 hover:bg-yellow-400 hover:text-white  text-white font-bold py-1 px-4 border border-yellow-500 rounded w-48 h-10 flex items-center mb-[-20px]">
        <Link to={`/admin/product/edit/${productData.data._id}`} className="hover:text-white">
        <span >Sửa khóa học</span>
        </Link>
      </button>
      <button className="bg-green-700 hover:bg-green-600 hover:text-white  text-white font-bold py-1 px-4 border border-green-600 rounded w-48 h-10 flex items-center ml-[38%]">
        <Link
          to={`/admin/lesson/add/${productData.data._id}`}
          className="flex items-center space-x-1  hover:text-white justify-center text-sm"
        >
          <FaPlus></FaPlus>
          <span>Thêm bài học</span>
        </Link>
      </button>
     </div>
      <div className="flex">
        <div className="w-1/2 p-4">
          <h1 className="text-2xl font-semibold mb-4">Thông tin khóa học</h1>
          <h1 className="text-xl font-normal"><span className="text-xl font-semibold">Tên khóa học: </span>{productData.data.name}</h1>
          <img
            src={productData.data.img}
            alt={productData.data.name}
          className="mt-4 w-[50%]"
          />
          <h1 className="text-xl mt-4 text-orange-700"><span className="text-lg font-semibold text-black">Giá khóa học: </span>{productData.data.price}$</h1>
          <p className="mt-4"><span className="text-lg font-semibold">Mô tả ngắn: </span>{productData.data.description}</p>
          <h1 className="mt-4"><span className="text-lg font-semibold">Danh mục: </span>{productData.data.categoryId.name}</h1>
        </div>
        {/* =============================================================  */}
        <div className="w-1/2 p-4">
          <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
          
          <ul>
            {lessons.map((lesson: any, index: any) => (
              <li key={index} className="border py-4 px-2 flex items-center gap-6 mb-4 hover:bg-gray-200 rounded-lg">
                <Link to={`/admin/lesson/detail/${lesson._id}`} className= "w-60">
                <h3 className="text-lg">Tên bài học: {lesson.name}</h3>
                </Link>
                <video
            src={lesson.video}
            className="w-36"
          />
             <div className="items-center space-x-3 ml-20">
             <button
                className="w-7 h-7 pl-2 bg-red-700 items-center text-white rounded-lg"
                
                onClick={() => confirm(lesson._id)}
              >
                <IoTrashOutline className="text-l " />
              </button>
              <button className="w-7 h-7 pl-2 bg-red-700 items-center text-white rounded-lg">
                <Link to={`/admin/lesson/edit/${lesson._id}`}>
                  <AiOutlineEdit className="text-l " />
                </Link>
              </button>
             </div>
              </li>
            ))}
          </ul>
      
        </div>
      </div>
    </>
  );
};

export default Detailproduct;
