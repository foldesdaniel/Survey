/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Surveys", "Authentication", "Results"],
  endpoints: (builder) => ({
    getSurveys: builder.query({
      query: (userId) => ({
        url: `surveys?userId=${userId}`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Surveys"],
    }),
    loginUser: builder.mutation({
      query: (body) => ({
        url: "authentication",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Authentication"],
    }),
    registerUser: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Authentication"],
    }),
    deleteSurvey: builder.mutation({
      query: (data) => ({
        url: `surveys/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Surveys"],
    }),
    createSurvey: builder.mutation({
      query: (body) => ({
        url: "surveys",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Surveys"],
    }),
    modifySurvey: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `surveys/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Surveys"],
    }),
    getResults: builder.query({
      query: (surveyId) => ({
        url: `results?surveyId=${surveyId}&$limit=50`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Results"],
    }),
    getSurveyByHash: builder.query({
      query: (hash) => ({
        url: `surveys?hash=${hash}`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Results"],
    }),
    createResult: builder.mutation({
      query: (body) => ({
        url: "results",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Results"],
    }),
  }),
});

export const apiReducer = apiSlice.reducer;

export const {
  useGetSurveysQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useDeleteSurveyMutation,
  useCreateSurveyMutation,
  useModifySurveyMutation,
  useGetResultsQuery,
  useGetSurveyByHashQuery,
  useCreateResultMutation,
} = apiSlice;
