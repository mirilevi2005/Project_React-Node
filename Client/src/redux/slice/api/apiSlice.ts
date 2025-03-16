import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ["Material"],
    endpoints: () =>({})
})
export default apiSlice