

const Boughted = () => {
    return (
        <>
         <section className="content grid grid-cols-3 m-5 w-screen">
            {/* <!-- Content 1 --> */}
            <div className="content1 px-5 w-full">
                {/* <!-- component --> */}
                <div className="flex items-center justify-center h-screen bg-[#EAFDFC] rounded-lg drop-shadow-xl">
                    <div
                        className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 w-[350px] h-[500px]">
                        <img className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
                            src="https://images.spiderum.com/sp-images/162eb75002e811eaa710c9be5867a18a.gif"
                            alt="product designer"/>
                        <h1 className="text-lg text-gray-700"> User Name </h1>
                        <h3 className="text-sm text-gray-400 "> Đang học </h3>
                        <p className="text-xs text-gray-700 mt-4"> Name : User Name </p>
                        <p className="text-xs text-gray-700 mt-4"> Email : useremail@gmail.com </p>
                        <p className="text-xs text-gray-700 mt-4"> Phone: 0123456789 </p>

                    </div>
                </div>
            </div>

            {/* <!-- Content 2 --> */}
            <div className="content2 px-5 w-full">
                {/* <!-- Khóa đang học --> */}
                <nav className="studing bg-[#BFEAF5] drop-shadow-xl rounded-lg ">
                    <h1 className="text-blue-500 font-bold px-5 pt-3">
                        Đang học
                    </h1>
                    {/* <!-- item--> */}
                    <div className="item1 px-2 mt-2 flex">
                        <img className="w-[170px] rounded-lg"
                            src="https://cdn.codegym.vn/wp-content/uploads/2021/12/khoa-hoc-lap-trinh-html-css-online-mien-phi-codegym-online-4.jpg"
                            alt=""/>
                        <div className="text px-8">
                            <h1 className="font-bold">HTML, CSS</h1>
                            <p className="text-sm font-normal text-gray-700">Ngày bắt đầu : 2/8/2023 </p>
                        </div>
                    </div>
                    {/* <!-- item --> */}
                    <div className="item1 px-2 mt-5 p-5 flex">
                        <img className="w-[170px] rounded-lg"
                            src="https://miro.medium.com/v2/resize:fit:1187/1*H0bdRYh03hNm1y0QuJIhkg.png" alt=""/>
                        <div className="text px-8">
                            <h1 className="font-bold">Typescript</h1>
                            <p className="text-sm font-normal text-gray-700">Ngày bắt đầu : 2/8/2023 </p>
                        </div>
                    </div>
                </nav>
                {/* <!-- Khóa đã xong --> */}
                <nav className="done  mt-5 bg-[#82AAE3] drop-shadow-xl rounded-lg ">
                    <h1 className="text-blue-500 font-bold p-5">
                        Đã xong
                    </h1>
                    {/* <!-- item--> */}
                    <div className="item1 px-2 mt-2 flex">
                        <img className="w-[170px] rounded-lg"
                            src="https://cdn.codegym.vn/wp-content/uploads/2021/12/khoa-hoc-lap-trinh-html-css-online-mien-phi-codegym-online-4.jpg"
                            alt=""/>
                        <div className="text px-8">
                            <h1 className="font-bold">HTML, CSS</h1>
                            <p className="text-sm font-normal text-gray-700">Ngày bắt đầu : 2/8/2023 </p>
                        </div>
                    </div>
                    {/* <!-- item --> */}
                    <div className="item1 px-2 mt-5 p-5 flex">
                        <img className="w-[170px] rounded-lg"
                            src="https://miro.medium.com/v2/resize:fit:1187/1*H0bdRYh03hNm1y0QuJIhkg.png" alt=""/>
                        <div className="text px-8">
                            <h1 className="font-bold">Typescript</h1>
                            <p className="text-sm font-normal text-gray-700">Ngày bắt đầu : 2/8/2023 </p>
                        </div>
                    </div>
                </nav>
            </div>

            {/* <!-- Content 3 --> */}
            <div className="content3 px-5 w-full">
                {/* <!-- Đơn mua --> */}
                <nav className="studing bg-[#EAFDFC] drop-shadow-xl rounded-lg">
                    <h1 className="text-blue-500 font-bold px-5">
                        Đơn mua
                    </h1>
                    {/* <!-- item--> */}
                    <div className="item1 px-2 mt-2 flex">
                        <img className="w-[170px] rounded-lg"
                            src="https://cdn.codegym.vn/wp-content/uploads/2021/12/khoa-hoc-lap-trinh-html-css-online-mien-phi-codegym-online-4.jpg"
                            alt=""/>
                        <div className="text px-8">
                            <h1 className="font-bold">HTML, CSS</h1>
                            <p className="text-sm font-normal text-red-700">800 $ </p>
                        </div>
                    </div>
                    <button className="bg-blue-500 p-3 text-white font-semibold rounded-lg m-5 ml-[200px] hover:bg-blue-700 hover:drop-shadow-lg">Xem chi tiết</button>
                </nav>
            </div>
        </section>
        </>
    )
}

export default Boughted