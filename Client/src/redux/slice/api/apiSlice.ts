
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "HomeLacturer", // שמירה על reducerPath שלך
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), // עדכון ה-baseUrl
  tagTypes: ["Material"],  // משדרגים את הטאגים כדי לנהל את הצורך בעדכון נתונים
  endpoints: () => ({}),
});

export default apiSlice;

