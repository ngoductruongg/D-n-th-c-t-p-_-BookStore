import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '@/Api/productApi';
import { useRemoveRatingMutation } from '@/Api/ratingApi';
import { Table, Skeleton, Button, Alert } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { IoTrashOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Import biểu tượng sao

const RatingProduct = () => {
    const { idProduct }: any = useParams<{ idProduct: string }>();
    const { data: productData, isLoading, refetch }: any = useGetProductByIdQuery(idProduct);
    const [removeRating, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] = useRemoveRatingMutation();
    console.log("Dữ liệu đánh giá:", productData?.data?.rating);
    // State để lưu trạng thái ẩn/hiện của đánh giá
    const [hiddenRatings, setHiddenRatings]: any = useState({});
    const toggleHidden = (ratingId: any) => {
        setHiddenRatings((prevHiddenRatings: any) => {
            const updatedHiddenRatings = {
                ...prevHiddenRatings,
                [ratingId]: !prevHiddenRatings[ratingId], // Đảo trạng thái ẩn/hiện
            };
    
            // Lưu trạng thái ẩn/hiện vào localStorage
            localStorage.setItem('hiddenRatings', JSON.stringify(updatedHiddenRatings));
    
            return updatedHiddenRatings;
        });
    };
    useEffect(() => {
        // Kiểm tra xem đã có trạng thái ẩn/hiện trong localStorage hay chưa
        const storedHiddenRatings = localStorage.getItem('hiddenRatings');
        if (storedHiddenRatings) {
            setHiddenRatings(JSON.parse(storedHiddenRatings));
        }
    }, []);
    // Xử lý khi người dùng nhấp vào nút xóa
    const handleRemoveRating = (ratingId: number) => {
        console.log('_id of rating to be removed:', ratingId);
        Swal.fire({
            title: 'Bạn Chắc Chắn Muốn Xóa chứ?',
            text: "Bạn sẽ không thể hủy nếu đồng ý '!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: ' Oke Luôn!',
            customClass: {
                popup: 'swal2-popup swal2-modal swal2-icon-warning swal2-show',
            },
        }).then((result) => {
            if (result.isConfirmed && result.dismiss !== Swal.DismissReason.cancel) {
                // Gọi mutation để xóa đánh giá và cập nhật trạng thái
                removeRating({ ratingId: ratingId, hidden: false }).then(() => {
                    // Sau khi xóa thành công, cập nhật lại danh sách sản phẩm bằng cách fetch lại dữ liệu
                    refetch();
                });
            }
        });
    };

    // Define columns for the ratings table
    const columns = [
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => (
                <span className={`${hiddenRatings[record._id] ? 'opacity-50' : ''}`}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: any, record: any) => (
                <span className={`${hiddenRatings[record._id] ? 'opacity-50' : ''}`}>
                    {text}
                </span>
            ),
        },
        {
            title: 'FeedBack',
            dataIndex: 'feedback',
            key: 'feedback',
            render: (text: any, record: any) => (
                <span className={`${hiddenRatings[record._id] ? 'opacity-50' : ''}`}>
                    {text}
                </span>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: number) => (
                <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                        <span key={index} className="mr-1">
                            {index < rating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-yellow-500" />}
                        </span>
                    ))}
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: 'action',
            render: (ratingId: number) => (
                <div>
                    <Button onClick={() => toggleHidden(ratingId)} className='mr-3'>
                        {hiddenRatings[ratingId] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    </Button>
                    <Button className='w-6 h-6 pl-1' type='primary' danger onClick={() => handleRemoveRating(ratingId)}>
                        <IoTrashOutline className="text-l " />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý Rating</h2>
            </header>
            {isRemoveSuccess && <Alert message="Xóa Thành Công!" type="success" />}
            {isLoading ? (
                <Skeleton />
            ) : (
                <Table
                    dataSource={productData?.data?.rating || []}
                    columns={columns}
                    rowKey={(record) => record._id}
                />
                
            )}
            
        </div>
    );
};

export default RatingProduct;