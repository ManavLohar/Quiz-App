import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApiSlice = createApi({
  reducerPath: "QuizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quiz-app-eight-tau-10.vercel.app",
    credentials: "include",
  }),
  tagTypes: [
    "Questions",
    "Admin",
    "CandidateQuestions",
    "TestHistory",
    "GeneratedLinks",
  ],
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/admin/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Admin", "Questions"],
    }),
    getAdmin: builder.query({
      query: () => "/admin",
      providesTags: ["Admin"],
    }),
    logoutAdmin: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Admin"],
    }),
    postQuestion: builder.mutation({
      query: (data) => ({
        url: "/admin/question",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Questions"],
    }),
    getQuestions: builder.query({
      query: () => "/admin/questions",
      providesTags: ["Questions", "Admin"],
    }),
    updateQuestion: builder.mutation({
      query: (data) => ({
        url: "/admin/question",
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
        url: "/admin/question",
        method: "DELETE",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Questions"],
    }),
    generateTestLink: builder.mutation({
      query: () => ({
        url: "/admin/generate-test-link",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["GeneratedLinks"],
    }),
    getGeneratedTestLinks: builder.query({
      query: () => "/admin/generated-test-link",
      providesTags: ["GeneratedLinks"],
    }),
    deleteGeneratedTestLink: builder.mutation({
      query: ({ testId }) => ({
        url: `/admin/delete-generated-test-link/${testId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GeneratedLinks", "TestHistory"],
    }),
    postCandidateName: builder.mutation({
      query: (data) => ({
        url: "/admin/candidate/name",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CandidateQuestions", "GeneratedLinks"],
    }),
    getQuestionsForCandidate: builder.query({
      query: ({ adminId, testId }) =>
        `/admin/questions/candidate/${adminId}/${testId}`,
      providesTags: ["CandidateQuestions"],
    }),
    postCheckAnswer: builder.mutation({
      query: (data) => ({
        url: "/admin/check-answer",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CandidateQuestions"],
    }),
    postSubmitTest: builder.mutation({
      query: (data) => ({
        url: "/admin/submit-test",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CandidateQuestions", "TestHistory", "GeneratedLinks"],
    }),
    getTestHistory: builder.query({
      query: ({ testId }) => `/admin/test-history/${testId}`,
      providesTags: ["TestHistory"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useGetAdminQuery,
  useLogoutAdminMutation,
  usePostQuestionMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGenerateTestLinkMutation,
  useGetGeneratedTestLinksQuery,
  useDeleteGeneratedTestLinkMutation,
  usePostCandidateNameMutation,
  useGetQuestionsForCandidateQuery,
  usePostCheckAnswerMutation,
  usePostSubmitTestMutation,
  useGetTestHistoryQuery,
} = quizApiSlice;
