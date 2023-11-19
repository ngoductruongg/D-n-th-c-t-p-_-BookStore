import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '@/interface/products';
import { removeFromCart, decreaseProductQuantity, increaseProductQuantity } from '@/app/actions'; 
import { MdDelete } from "react-icons/md";
import { CiCirclePlus,CiCircleMinus  } from "react-icons/ci";
const Cart: React.FC = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId: any) => {
    dispatch(removeFromCart(productId));
  };

  const increaseQuantity = (productId: any) => {
    dispatch(increaseProductQuantity(productId));
  };

  const decreaseQuantity = (productId: any) => {
    dispatch(decreaseProductQuantity(productId));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className='py-48 max-w-7xl mx-auto '>
      <table className="table-auto w-[800px] rounded-lg overflow-hidden bg-gray-200">
      <thead>
          <tr className='border-2 border-t-0 border-l-0 border-r-0 border-black'>
            <th></th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody >
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <tr className='text-center border-2 border-t-0 border-l-0 border-r-0 border-black ' key={index}>
                <td  className='p-4  border-black'>
                  <img
                    src={item.img}
                    alt={`Hình ảnh của ${item.name}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td  className='p-4  border-black'>{item.name}</td>
                <td  className='p-4  border-black'>{item.price} </td>
                <td  className='p-4  border-black  text-[20px]'>
                  <button className='pr-2 ' onClick={() => decreaseQuantity(item.id)}><CiCircleMinus className="text-[20px]"/></button>
                 {item.quantity}
                  <button className='pl-2' onClick={() => increaseQuantity(item.id)}><CiCirclePlus className="text-[20px]"/></button>
                </td>
                <td  className='p-4  border-black'>{item.price * item.quantity} </td>
                <td  className='p-4  border-black'>
                  <button onClick={() => handleRemoveFromCart(item.id)}><MdDelete className="text-[30px]"/></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Giỏ hàng trống</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="total-price text-[30px]">
        Tổng cộng: {totalPrice} 
      </div>
    </div>
  );
};

export default Cart;
