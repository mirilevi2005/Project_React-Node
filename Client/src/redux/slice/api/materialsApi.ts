import { Video, VideosResponse } from '../../../interface/VideoMaterial';
import apiSlice from './apiSlice';

const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addMaterial: builder.mutation({
      query: ({ formData, nameCours }) => ({
        url: `/HomeLacturer/${nameCours}`,  // שם הקורס נכנס ב-URL
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Material"],
    }),
    

    getAllMaterialsByNameCourse: builder.query<VideosResponse, string>({
      query: (courseName) => `/HomeLacturer/${courseName}`,
      providesTags: ["Material"],
    }),
    


    // קבלת סרטון לפי מזהה
    getMaterialById: builder.query<Video, string>({
      query: (id) => `/HomeLacturer/${id}`,  // ניתן לעדכן את הנתיב כך שיתאים לכל סרטון
      providesTags: ["Material"]
    }),
   
   
    
    upDateMaterial: builder.mutation<Video, FormData>({
      query: (formData) => {
        const nameCours = formData.get("nameCours") as string;
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
