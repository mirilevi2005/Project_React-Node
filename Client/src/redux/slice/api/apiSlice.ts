
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api", // שמירה על reducerPath שלך
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), // עדכון ה-baseUrl
  tagTypes: ["Material", "User", "Test"],  // משדרגים את הטאגים כדי לנהל את הצורך בעדכון נתונים
  endpoints: () => ({}) // השאר ריק עד שיתווספו ה-endpoints
});

export default apiSlice;


