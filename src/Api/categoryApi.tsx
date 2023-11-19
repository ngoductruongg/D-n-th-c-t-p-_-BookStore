import { pause } from '@/utils/pause';
import { Category,CategoryApiResponse } from '@/interface/categorys';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
    reducerPath: 'category',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getCategorys: builder.query<CategoryApiResponse, void>({
            query: () => `/category`,
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<Category, number | string>({
            query: (_id) => `/category/${_id}`,
            providesTags: ['Category']
        }),
        removeCategory: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/category/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Category']
        }),
        addCategory: builder.mutation<Category, Category>({
            query: (category) => ({
                url: `/category`,
                method: "POST",
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation<Category, Category>({
            query: (category) => ({
                url: `/category/${category._id}`,
                method: "PUT",
                body: category
            }),
            invalidatesTags: ['Category']
        })
    })
});

export const {
    useGetCategorysQuery,
    useGetCategoryByIdQuery,
    useRemoveCategoryMutation,
    useAddCategoryMutation,
    useUpdateCategoryMutation
} = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;