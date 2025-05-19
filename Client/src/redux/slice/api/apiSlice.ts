
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api", // צריך להיות שם רגיל, לא "/"
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), // נניח שכל הנתיבים שלך מתחילים ב-/test
  tagTypes: ["Material", "User", "Test"],
  endpoints: () => ({})
});

export default apiSlice;
