import { Video } from '../../../interface/VideoMaterial';
import apiSlice from './apiSlice';

const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // הוספת חומר (סרטון)
    // addMaterial: builder.mutation({
    //    query: ({ file, nameCours, uploadDate, finishDate, videoPath, videoName }) => {
    //     const formData = new FormData(); 
    //     // הוספת קובץ הווידאו
    //     formData.append("video", file);     
    //     // הוספת פרטי הקורס
    //     formData.append("nameCours", nameCours);
    //     formData.append("uploadDate", uploadDate); // אם אתה רוצה גם את תאריך העלאה
    //     formData.append("finishDate", finishDate);
    //     formData.append("videoPath", videoPath);
    //     formData.append("videoName", videoName);
        
    //     return {
    //       url: `/HomeLacturer/${nameCours}`,
    //       method: "POST", // במקרה של העלאה, השתמש ב-POST
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: ["Material"],
    // }),
   
    addMaterial: builder.mutation({
      query: ({ formData, nameCours }) => ({
        url: `/HomeLacturer/${nameCours}`,  // שם הקורס נכנס ב-URL
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Material"],
    }),
    


    // קבלת כל הסרטונים לפי שם קורס
    getAllMaterialsByNameCourse: builder.query<Video[], string>({
      query: (courseName) => `/HomeLacturer/${courseName}`, // בקשה לקורס הדינמי
      providesTags: ["Material"]
    }),


    // קבלת סרטון לפי מזהה
    getMaterialById: builder.query<Video, string>({
      query: (id) => `/HomeLacturer/${id}`,  // ניתן לעדכן את הנתיב כך שיתאים לכל סרטון
      providesTags: ["Material"]
    }),
   
    // עדכון חומר (סרטון)
    upDateMaterial: builder.mutation<Video, FormData>({
      query: (formData) => {
        const nameCours = formData.get("nameCours") as string;  // ודא שאתה מקבל את שם הקורס כראוי
        return {
          url: `/HomeLacturer/${nameCours}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Material"],
    }),
    
    

    // מחיקת חומר (סרטון)
    deleteMaterial: builder.mutation<void, string>({
      query: (courseName) => ({
        url: `/HomeLacturer/material/${courseName}`,  // השתמש ב-videoPath כפרמטר ב-URL
        method: "DELETE",
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
