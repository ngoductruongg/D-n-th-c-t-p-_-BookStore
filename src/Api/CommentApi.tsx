import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IComment , ICommentApiResponse} from '@/interface/comment'
const commentApi = createApi({
    reducerPath: 'comment',
    tagTypes: ['Comment'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getComments: builder.query<ICommentApiResponse, void>({
            query: () => `/comment`,
            providesTags: ['Comment']
        }),
        getCoursesForIdproduct: builder.query<IComment, number | string>({
            query: (productId) => `/comment/${productId}`,
            providesTags: ['Comment']
        }),
        removeComment: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/comment/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Comment'],
        }),
        addComment: builder.mutation<IComment, IComment>({
            query: (comment) => ({
                url: `/comment`,
                method: "POST",
                body: comment
            }),
            invalidatesTags: ['Comment']
        }),
      
    })
});

export const {
   useAddCommentMutation,
   useGetCoursesForIdproductQuery,
   useGetCommentsQuery,
   useRemoveCommentMutation
} = commentApi;
export const commentReducer = commentApi.reducer;
export default commentApi;