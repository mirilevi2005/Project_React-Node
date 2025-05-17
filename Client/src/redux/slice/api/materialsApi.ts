// import { Video, VideosResponse } from '../../../interface/VideoMaterial';
// import apiSlice from './apiSlice';

// const materialsApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({

//     addMaterial: builder.mutation({
//       query: ({ formData, nameCours }) => ({
//         url: `/HomeLacturer/${nameCours}`,  // שם הקורס נכנס ב-URL
//         method: 'POST',
//         body: formData,
//       }),
//       invalidatesTags: ["Material"],
//     }),
    


//     getAllMaterialsByNameCourse: builder.query<VideosResponse, string>({
//       query: (courseName) => `/HomeLacturer/${courseName}`,
//       providesTags: ["Material"],
//     }),
    


//     // קבלת סרטון לפי מזהה
//     getMaterialById: builder.query<Video, string>({
//       query: (id) => `/HomeLacturer/${id}`,  // ניתן לעדכן את הנתיב כך שיתאים לכל סרטון
//       providesTags: ["Material"]
//     }),

    
//     upDateMaterial: builder.mutation<Video, FormData>({
//       query: (formData) => {
//         const nameCours = formData.get("nameCours") as string;
//         return {
//           url: `/HomeLacturer/${nameCours}`,
//           method: "PUT",
//           body: formData,
//         };
//       },
//       invalidatesTags: ["Material"],
//     }),
    
    

//     // מחיקת חומר (סרטון)
//     deleteMaterial: builder.mutation<void, string>({
//       query: (courseName) => ({
//         url: `/HomeLacturer/material/${courseName}`,  // השתמש ב-videoPath כפרמטר ב-URL
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Material"],
//     }),

    
//   })
// });

// // יצוא הפונקציות שניתן להשתמש בהן ב-React
// export const { 
//   useAddMaterialMutation,
//   useGetAllMaterialsByNameCourseQuery,
//   useGetMaterialByIdQuery,
//   useUpDateMaterialMutation,
//   useDeleteMaterialMutation
// } = materialsApiSlice;

// export default materialsApiSlice;





import { Video, VideosResponse } from '../../../interface/VideoMaterial';
import apiSlice from './apiSlice';

const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // הוספת חומר חדש
    addMaterial: builder.mutation({
      query: ({ formData, nameCours }) => ({
        url: `/HomeLacturer/${nameCours}`,  // שם הקורס נכנס ב-URL
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Material"],
    }),

    // קבלת כל החומרים לפי שם קורס
    getAllMaterialsByNameCourse: builder.query<VideosResponse, string>({
      query: (courseName) => `/HomeLacturer/${courseName}`, // נתיב זה ישלח את שם הקורס
      providesTags: ["Material"],
    }),

    // קבלת חומר לפי מזהה
    getMaterialById: builder.query<Video, string>({
      query: (id) => `/HomeLacturer/${id}`,  // נתיב לשאילתא לפי מזהה הסרטון
      providesTags: ["Material"]
    }),

    // עדכון חומר (סרטון)
    upDateMaterial: builder.mutation<Video, FormData>({
      query: (formData) => {
        const nameCours = formData.get("nameCours") as string;
        return {
          url: `/HomeLacturer/${nameCours}`,  // עדכון לפי שם הקורס
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Material"],
    }),

    // מחיקת חומר (סרטון)
  // עדכון ה-endpoint deleteMaterial ב-apiSlice כדי לקבל אובייקט עם videoId ו-publicId
deleteMaterial: builder.mutation<void, { videoId: string; publicId: string }>({
  query: ({ videoId, publicId }) => ({
    url: `/HomeLacturer/material/${videoId}`,  // השתמש ב-videoId ב-URL
    method: "DELETE",
    body: { publicId },  // שלח את ה-publicId בגוף הבקשה
  }),
  invalidatesTags: ["Material"],
}),
    
  })
});

// יצוא הפונקציות שניתן להשתמש בהן ב-React
export const { 
  useAddMaterialMutation,
  useGetAllMaterialsByNameCourseQuery,
  useGetMaterialByIdQuery,
  useUpDateMaterialMutation,
  useDeleteMaterialMutation
} = materialsApiSlice;

export default materialsApiSlice;
