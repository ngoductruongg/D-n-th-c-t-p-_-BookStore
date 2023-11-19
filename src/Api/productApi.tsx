import { pause } from '@/utils/pause';
import { IProduct,IProductApiResponse, IProductApiResponse_id } from '@/interface/products';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productApi = createApi({
    reducerPath: 'product',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: "  http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProductApiResponse, void>({
            query: () => `/product`,
            providesTags: ['Product']
        }),
        getProductsByPrice: builder.query<IProductApiResponse, void>({
            query: () => `/products/price`,
            providesTags: ['Product']
        }),
        getProductsFree: builder.query<IProductApiResponse, void>({
            query: () => `/products/free`,
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProductApiResponse_id, number | string>({
            query: (_id) => `/product/${_id}`,
            providesTags: ['Product']
        }),
        removeProduct: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/product/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Product']
        }),
        addProduct: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/product`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        addOrderDetail: builder.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/product/oderdetail`,
                method: "POST",
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation<IProduct, { product: IProduct; formData: FormData }>({
            query: ({ product, formData }) => ({
              url: `/product/${product._id}`,
              method: "PUT",
              body: formData, // Sử dụng formData làm nội dung yêu cầu
            }),
            invalidatesTags: ['Product'],
          })
          
    })
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductsByPriceQuery,
    useGetProductsFreeQuery,
    useRemoveProductMutation,
    useAddProductMutation,
    useUpdateProductMutation,
    useAddOrderDetailMutation
} = productApi;
export const productReducer = productApi.reducer;
export default productApi;