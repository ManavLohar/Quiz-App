import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApiSlice = createApi({
  reducerPath: "QuizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  tagTypes: ["Questions"],
  endpoints: (builder) => ({
    postQuestion: builder.mutation({
      query: (data) => ({
        url: "/question",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Questions"],
    }),
    getQuestions: builder.query({
      query: () => "/question",
      providesTags: ["Questions"],
    }),
    updateQuestion: builder.mutation({
      query: (data) => ({
        url: "/question",
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Questions"],
    }),
    deleteQuestion: builder.mutation({
      query: (data) => ({
        url: "/question",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  usePostQuestionMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = quizApiSlice;
