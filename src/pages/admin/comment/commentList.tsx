import React from 'react'
import { Table, Skeleton, Popconfirm, Alert, Button, notification } from "antd";
import { Link, Navigate, useParams } from "react-router-dom";
import { IoTrashOutline } from 'react-icons/io5';
import { AiOutlineEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useGetCoursesForIdproductQuery, useRemoveCommentMutation,useGetCommentsQuery } from "@/Api/CommentApi";
import { IComment } from "@/interface/comment";
const commentList = () => {
    const { data: commentData,isLoading } = useGetCommentsQuery();
    

    const [removeComment, { isLoading: isRemoveLoading, }] =
        useRemoveCommentMutation();
    const confirm = (id: number) => {
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
                removeComment(id);
                notification.success({
                    message: 'Success',
                    description: 'Product remove successfully!',});
            }
        })

    }
    console.log(commentData);


    const dataSource = commentData?.map(({ _id,nameuser,content,productId,userId }: IComment) => ({
        key: _id,
        _id,
        nameuser,
        content,
        productId,
        userId
    }))

    const columns = [
        {
            title: "Tên ",
            dataIndex: "nameuser",
            key: "nameuser",
        },
        {
            title: "nội dung comment ",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Id sách ",
            dataIndex: "productId",
            key: "productId",
        },
        {
            title: "Id user ",
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
                <h2 className="font-bold text-2xl">Quản bình luận</h2>
                <button className="bg-yellow-600 hover:bg-yellow-500 hover:text-white text-white font-bold py-1 px-4 border border-yellow-500 rounded " >
                    <Link to="/admin/products" className="flex items-center space-x-2  hover:text-white">
                  Quay lại
                    </Link>
                </button>
            </header>
           
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}
        </div>
    );
};



export default commentList