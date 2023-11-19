import { pause } from "@/utils/pause";
import { createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const paymentApi = createApi({
    reducerPath: 'payment',
    tagTypes:['Payment'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints:(builder) => ({
    createPayment: builder.mutation({
            query: (paymentData) => ({
                url: '/create-payment',
                method: 'POST',
                body: paymentData,
            }),
    }),
    returnUrl: builder.query({
        query: () => ({
            url: '/vnpay_return', 
            method: 'GET', 
        }),
    }),
    ipnUrl: builder.query({
        query: () => ({
            url: '/vnpay_ipn', 
            method: 'GET', 
        }),
    }),
})
});

export const {
    useCreatePaymentMutation,
    useReturnUrlQuery,
    useIpnUrlQuery
} = paymentApi
export const paymentReducer = paymentApi.reducer
export default paymentApi 