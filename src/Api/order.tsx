import { pause } from '@/utils/pause';
import { IOrder, IOrderApiResponse} from '@/interface/order';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const orderApi = createApi({
    reducerPath: 'order',
    tagTypes: ['Order'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api", // Thay đổi URL API đơn hàng tại đây
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getOrders: builder.query<IOrderApiResponse, void>({
            query: () => `/order`,
            providesTags: ['Order']
        }),
        getOrderById: builder.query<IOrderApiResponse, number | string>({
            query: (_id) => `/order/${_id}`,
            providesTags: ['Order']
        }),
        removeOrder: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/order/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Order']
        }),
        addOrder: builder.mutation<IOrder, IOrder>({
            query: (order) => ({
                url: `/order`,
                method: "POST",
                body: order
            }),
            invalidatesTags: ['Order']
        }),
        updateOrderStatus: builder.mutation<IOrder, { order: IOrder; formData: FormData }>({
            query: ({ order, formData }) => ({
                url: `/order/${order._id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ['Order'],
        })
    })
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useRemoveOrderMutation,
    useAddOrderMutation,
    useUpdateOrderStatusMutation
} = orderApi;
export const orderReducer = orderApi.reducer;
export default orderApi;
