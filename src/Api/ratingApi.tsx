import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRating , IRatingApiResponse} from '@/interface/rating'
const ratingApi = createApi({
    reducerPath: 'rating',
    tagTypes: ['Rating'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getRatings: builder.query<IRatingApiResponse, void>({
            query: () => `/rating`,
            providesTags: ['Rating']
        }),
        getRatingById: builder.query<IRating, number | string>({
            query: (_id) => `/rating/${_id}`,
            providesTags: ['Rating']
        }),
        removeRating:builder.mutation<void, number>({
            query: ( _id ) => ({
                url: `/rating/${_id}`,
                method: "DELETE",
               
            }),
            invalidatesTags: ['Rating'],
        }),
        addRating: builder.mutation<IRating, IRating>({
            query: (rating) => ({
                url: `/rating`,
                method: "POST",
                body: rating
            }),
            invalidatesTags: ['Rating']
        }),
        updateRatingHidden: builder.mutation<void, { ratingId: string; hidden: boolean }>({
            query: ({ ratingId, hidden }) => ({
                url: `/rating/${ratingId}`,
                method: 'PUT',
                body: { hidden }, 
            }),
            
        }),
    })
});

export const {
    useGetRatingsQuery,
    useGetRatingByIdQuery,
    useRemoveRatingMutation,
    useAddRatingMutation,
    useUpdateRatingHiddenMutation
} = ratingApi;
export const ratingReducer = ratingApi.reducer;
export default ratingApi;