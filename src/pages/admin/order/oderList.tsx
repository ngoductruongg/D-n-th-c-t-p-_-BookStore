// import { useGetProductsQuery,useRemoveProductMutation } from "@/Api/productApi";

import { Table, Skeleton, Popconfirm, Alert, Button, notification } from "antd";
import { Link, Navigate, useParams } from "react-router-dom";
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
// import { useGetCoursesForIdproductQuery, useRemoveCommentMutation } from "@/Api/CommentApi";
import { useGetRatingByIdQuery,useGetRatingsQuery } from "@/Api/ratingApi";
import { useRemoveRatingMutation } from "@/Api/ratingApi";
import { IComment } from "@/interface/comment";
import { IRating } from "@/interface/rating";
type Props = {};
const ListOder = (props: Props) => {
  
  const { data: ratingData, isLoading, error } = useGetRatingsQuery();

  const [removeProduct, { isLoading: isRemoveLoading, }] =useRemoveRatingMutation();
  const confirm = (id: any) => {
      Swal.fire({
          title: 'Bạn Chắc Chắn Muốn Xóa chứ?',
          text: "Lưu ý : Bạn sẽ không thể hủy nếu đồng ý '!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: ' Đồng ý',
          customClass: {
              popup: 'swal2-popup swal2-modal swal2-icon-warning swal2-show', // Áp dụng quy tắc CSS trực tiếp
          },
      }).then((result) => {
          if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
              removeProduct(id);
              console.log(id)
              notification.success({
                  message: 'Success',
                  description: 'Product remove successfully!',});
          }
      })

  }
  console.log(ratingData?.data);


  const dataSource = ratingData?.data.map(({ _id, feedback,rating,productId,  userId }: IRating) => ({
      key: _id,
      _id,
      feedback,
      rating,
      productId,
      userId
  }))

  const columns = [
      {
          title: "feedback ",
          dataIndex: "feedback",
          key: "feedback",
      },
      {
          title: "rating",
          dataIndex: "rating",
          key: "rating",
      },
      {
        title: "productId",
        dataIndex: "productId",
        key: "productId",
    },
    {
      title: "userId",
      dataIndex: "userId",
      key: "userId",
  },
   
      {
          title: "",
          render: ({ key: _id }: any) => {
              return (
                  <>
                      <div className="flex items-center justify-center mr-auto">
                          <Button className='w-9 h-8 pl-2 ml-2' type='primary' danger onClick={() => confirm(_id)}>
                              <IoTrashOutline className="text-xl" />
                          </Button>
                          
                      </div>
                  
                  </>
              );
          },
      },
  ];

  return (
      <div>
          <header className="mb-4 flex justify-between items-center">
              <h2 className="font-bold text-2xl">Quản lý Đánh giá</h2>
             
          </header>
         
          {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
      </div>
  );
};
export default ListOder;