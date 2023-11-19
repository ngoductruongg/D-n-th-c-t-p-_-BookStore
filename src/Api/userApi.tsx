import { IProductApiResponseUser, IUsers } from '@/interface/user';
import { pause } from '@/utils/pause';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
    reducerPath: 'user',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        GetAllUser: builder.query<IProductApiResponseUser, void>({
            query: () => `/user`,
            providesTags: ['User']
        }),
        GetOneUser: builder.query<IUsers, number | string>({
            query: (_id) => `/user/${_id}`,
            providesTags: ['User']
        }),
        DeleteUser: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/user/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['User']
        }),
        SignUp: builder.mutation<IUsers, IUsers>({
            query: (user) => ({
                url: `/Signup`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation<IUsers, IUsers>({
            query: (user) => ({
                url: `/user/${user._id}`,
                method: "PUT",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        Login: builder.mutation<IUsers, IUsers>({
            query: (user) => ({
                url: `/Signin`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        ChangePassword: builder.mutation<IUsers, IUsers>({
            query: (user) => ({
                url: `/changePassword`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        ForgotPassword: builder.mutation<IUsers, IUsers>({
            query: (user) => ({
                url: `/forgotPassword`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
        ResetPassword: builder.mutation<IUsers, IUsers>({
            query: (user) => ({
                url: `/resetPassword`,
                method: "POST",
                body: user
            }),
            invalidatesTags: ['User']
        }),
    })
});

export const {
    useGetAllUserQuery,
    useGetOneUserQuery,
    useDeleteUserMutation,
    useSignUpMutation,
    useLoginMutation,
    useUpdateUserMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = userApi;
export const UserReducer = userApi.reducer;
export default userApi;