// import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// const apiSlice = createApi({
//   reducerPath: "/", // שמירה על reducerPath שלך
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), // עדכון ה-baseUrl
//   tagTypes: ["Material", "User", "Test"],  // משדרגים את הטאגים כדי לנהל את הצורך בעדכון נתונים
//   endpoints: () => ({}) // השאר ריק עד שיתווספו ה-endpoints
// });

// export default apiSlice;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api", // צריך להיות שם רגיל, לא "/"
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }), // נניח שכל הנתיבים שלך מתחילים ב-/test
  tagTypes: ["Material", "User", "Test"],
  endpoints: () => ({})
});

export default apiSlice;
