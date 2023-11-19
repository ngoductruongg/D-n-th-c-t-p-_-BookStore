import { pause } from '@/utils/pause';
import { Lesson, LessonData_id } from '@/interface/lessons';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const lessonApi = createApi({
    reducerPath: 'lesson',
    tagTypes: ['Lesson'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8088/api",
        fetchFn: async (...args) => {
            await pause(300);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getLessons: builder.query<Lesson, void>({
            query: () => `/lesson`,
            providesTags: ['Lesson']
        }),
        getLessonById: builder.query<LessonData_id, number | string>({
            query: (_id) => `/lesson/${_id}`,
            providesTags: ['Lesson']
        }),
        removeLesson: builder.mutation<void, number>({
            query: (_id) => ({
                url: `/lesson/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Lesson']
        }),
        addLesson: builder.mutation<Lesson, Lesson>({
            query: (lesson) => ({
                url: `/lesson`,
                method: "POST",
                body: lesson
            }),
            invalidatesTags: ['Lesson']
        }),
      
        updateLesson: builder.mutation<Lesson, { lesson: Lesson; formData: FormData }>({
            query: ({lesson, formData}) => ({
                url: `/lesson/${lesson._id}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ['Lesson']
        })
    })
});

export const {
    useAddLessonMutation,
    useGetLessonByIdQuery,
    useGetLessonsQuery,
    useUpdateLessonMutation,
    useRemoveLessonMutation
} = lessonApi;
export const lessonReducer = lessonApi.reducer;
export default lessonApi;