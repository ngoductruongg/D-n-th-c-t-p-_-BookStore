import { useGetProductsQuery } from "@/Api/productApi";
import { PiListDashesBold } from "react-icons/pi";
import { useGetCategorysQuery } from "@/Api/categoryApi";
import { IProduct } from "@/interface/products";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Category } from "@/interface/categorys";
import { RaceBy } from '@uiball/loaders'

const Danhmuc = () => {
  const { data: productData, error, isLoading: productIsLoading, } = useGetProductsQuery();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { data: categoryData } = useGetCategorysQuery();
  const [selectedCategory, setSelectedCategory] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState<string>("all");
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  const [showCategoryButtons, setShowCategoryButtons] = useState(false);
  

  const renderCourseList = () => {
    if (isLoading) {
      return<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-[#d0ccd0] to-[#605856]">
      <RaceBy size={100} lineWeight={6} speed={1.4} color="white" />
      <div className="mt-2 text-black font-medium" style={{ color: 'white' }}>Loading</div>
    </div>
    }

    if (error) {
      return <p>Error</p>;
    }

    if (!productData || !productData.data || productData.data.length === 0) {
      return <p>No courses available</p>;
    }
    const isLoggedIn = !!localStorage.getItem('userToken');
    const handlePurchase = () => {
      const isLoggedIn = !!localStorage.getItem('userToken');
      if (!isLoggedIn) {
        // Show a message that user needs to login
        alert('Bạn cần đăng nhập để tiếp tục mua hàng!');
        window.location.href = '/signin';
        return;
      }

      // ... your purchase logic here (if the user is logged in)
    }
    // const filteredProducts = productData?.data?.filter(product => {
    //         return selectedCategory ? product.categoryId._id === selectedCategory : true;
    //     });
    const filteredProducts = productData?.data?.filter(product => {
      // Filter by category if it's selected
      const byCategory = selectedCategory ? product.categoryId._id === selectedCategory : true;

      // Filter by price
      if (filterOption === "free") {
        return byCategory && product.price <= 500;
      }
      else if (filterOption === "paid") {
        return byCategory && product.price > 500;
      }
      return byCategory;
    });

    return (
      <section className="content mx-auto py-[88px] max-w-7xl  h-[1300px] ">
        <div className=" bg-white px-5 h-[100%] mt-8">
          <div className="pt-10 mb-5 ">
            <h1 className="text-3xl font-semibold ">Danh mục</h1>
          </div>

               {/* ====================================== */}
          <div className="grid md:grid-cols-12 gap-8 ">
            {/* ====================================== */}
           
            <div className="  md:hidden  ">
            <PiListDashesBold
              className="md:hidden"
              onClick={() => setShowCategoryButtons(!showCategoryButtons)}
            />
            {showCategoryButtons && (
              <div className=" md:hidden  rounded">
                {categoryData?.data?.map((category) => (
                  <button
                    key={category._id}
                    className="rounded-lg text-[#0B7077] font-bold hover:bg-[#D2E6E4] py-2 pl-3 w-full text-left whitespace-normal break-words"
                    onClick={() => setSelectedCategory(category._id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
         
            <div className="col-span-2 hidden md:block ">
              <div className=" ">
                {categoryData?.data?.map((category) => (
                  <button
                    key={category._id}
                    className="rounded-lg text-black hover:text-white font-bold hover:bg-gradient-to-r from-[#d0ccd0] to-[#605856]  py-2 pl-3 w-full text-left whitespace-normal break-words"
                  onClick={() => setSelectedCategory(category._id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
          
          </div>
        
            {/* ========================================= */}
            <div className="col-span-10 ">
              <div className="relative inline-flex ">
                <svg
                  className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 412 232"
                >
                  <path
                    d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                    fill="#648299"
                    fillRule="nonzero"
                  />
                </svg>
                <select
                  className=" mb-20 border border-gray-300 font-normal text-gray-900 h-10 pl-5 pr-10 bg-gradient-to-r hover:border-gray-400 focus:outline-none appearance-none"
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <option value="all">Tất cả</option>
                   <option value="paid">Trên  500.000</option>
                  <option value="free">Dưới 500.000</option>
                 
                </select>
              </div>
             
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 m-auto mb-8 max-w-7xl ">
              {filteredProducts?.map((product: any) => (
                <div
                  key={product._id}
                  className="border-2 p-2 group mb-8 bg-white rounded-lg max-w-[296px] transition-transform transform hover:scale-95 hover:shadow-xl border-gray-200"
                >
                  <Link to={`/detail/${product._id}`} className="">
                    <div className="block relative">
                      <div className="rounded-t-lg overflow-hidden">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full text-[10px] h-[300px] object-cover rounded-t-lg transform group-hover:opacity-80 transition-opacity rounded-lg"
                        />
                        <img src="" alt="" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-60 transition-opacity rounded-lg"></div>
                      </div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
                        <button className="w-40 h-10 bg-white  opacity-0 group-hover:opacity-100 transition-opacity rounded-full ">
                          Xem chi tiết 
                        </button>

                      </div>
                    </div>
                    <div className="p-2">
                      <h2 className="text-[18px]  mt-4  text-[#6c6d6d]">
                        {product.name.length <= 25
                          ? product.name
                          : product.name.slice(0, 25) + " ..."}
                      </h2>
                      <div className=" mt-2  max-w-[278px]">
                        <div className=" text-base font-bold mt-1">
                          <p className="text-red-600 text-[15px]">
                            {product.price === "0" ? 'Miễn phí' : `${parseFloat(product.price).toLocaleString('vi-VN')}đ`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                </div>

              ))}
            </div>
            </div>
            {/* ====================================== */}
          </div>
        </div>
      </section>

    );
  };

  return <>{renderCourseList()}</>;
};

export default Danhmuc;