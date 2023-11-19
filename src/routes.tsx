import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutlClinet from "./components/Layouts/LayoutlClinet";
import LayoutAdmin from "./components/Layouts/LayoutAdmin";
import Home from "./pages/client/Home";
import Listproduct from "./pages/admin/product/Listproduct";
import Addproduct from "./pages/admin/product/add";
import EditProduct from "./pages/admin/product/edit";
import Danhmuc from "./pages/client/Danhmuc";
import Contact from "./pages/client/Contact";
import Boughted from "./pages/client/Boughted";
import Signin from "./components/Layouts/Signin";
import Signup from "./components/Layouts/Signup";
import Listcategory from "./pages/admin/category";
import Addcategory from "./pages/admin/category/add";
import Editcategory from "./pages/admin/category/edit";
import ProductDetail from "./pages/client/detail";
import Pay from "./pages/client/Pay";
import Orderdetail from "./pages/admin/product/Oderdetail";
import User from "./pages/admin/User/User";
import EditUser from "./pages/admin/User/EditUser";
import Detailproduct from "./pages/admin/product/Detailproduct";
import RatingProduct from "./pages/admin/product/ratingProduct";
import CommentProduct from "./pages/admin/product/commentProduct";
import ChangePassword from "./components/Layouts/changePassword";
import ProfileUser from "./pages/admin/User/profileUser";
import ListOrder from "./pages/admin/order/oderList";
import EditProfile from "./pages/admin/User/editProfile";

import Thong_tin_thanhtoan from "./pages/client/Thong_tin_thanhtoan";
import ThanhToan from "./pages/client/ThanhToan";
import ForgotPassword from "./components/Layouts/forgotPassword";
import Cart from "./pages/client/Cart";
import CommentList from "./pages/admin/comment/commentList"
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
const isAdmin = userInfo && userInfo.userData && userInfo.userData.role === 'admin';

function ProtectedElement({ children }) {
  const isLoggedIn = !!localStorage.getItem('userInfo');
  return isLoggedIn ? children : <Navigate to="/pay" />;
}


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayoutlClinet />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "danhmuc",
        element: <Danhmuc />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "detail/:idProduct",
        element: <ProductDetail/>
      },
      {
        path:"pay/:idProduct",
        element:<ProtectedElement><Pay/></ProtectedElement>
      },
  
  
      {
        path:"profile/:idUser",
        element:<ProfileUser/>
      },
      {
        path: "profile/edit/:idUser",
        element: <EditProfile />
      },

      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "boughted",
        element: <Boughted />
      },
      

    ],
  },
  {
    path: "signin",
    element: (
      <Signin />
    ),
  },
  {
    path: "forgotPassword",
    element: (
      <ForgotPassword />
    ),
  },
  {
    path: "signup",
    element: (
      <Signup />
    ),
  },
  {
    path: "Thongtinthanhtoan/:idProduct",
    element: (
      <Thong_tin_thanhtoan />
    ),
  },
  {
    path: "ThanhToan/:idProduct",
    element: (
      <ThanhToan/>
    ),
  },
  {
    path: "changePassword",
    element: (
      <ChangePassword />
    ),
  },


  {
    path: "/admin",
    element: (
      isAdmin ? <LayoutAdmin /> : <Navigate to="/" />  // Nếu không phải là admin, chuyển hướng về trang chính
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <div>dashboard kiểu index.html</div>
      },
      {
        path: "products",
        element: <Listproduct />
      },
      {
        path: "product/add",
        element: <Addproduct />
      },
      {
        path: "product/oderdetail",
        element: <Orderdetail />
      },
      {
        path: "product/edit/:idProduct",
        element: <EditProduct />
      },
      {
        path: "product/ratings/:idProduct",
        element: <RatingProduct />
      },
      {
        path: "product/comments/:idProduct",
        element: <CommentProduct />
      },
      {
        path: "user/edit/:idUser",
        element: <EditUser />
      },
      {
        path: "user",
        element: <User />
      },
      {
        path: "categorys",
        element: <Listcategory />
      },
      {
        path: "category/add",
        element: <Addcategory />
      },
      {
        path: "category/edit/:idCategory",
        element: <Editcategory />
      },
      {
        path: "product/detail/:idProduct",
        element: <Detailproduct />,
      },
      {
        path: "orders",
        element: <ListOrder />
      },
      {
        path: "comment",
        element: <CommentList />
      },
    ],
  },
]);