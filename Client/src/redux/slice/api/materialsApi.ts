

import { Video, VideosResponse } from '../../../interface/VideoMaterial';
import apiSlice from './apiSlice';

const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addMaterial: builder.mutation({
      query: ({ formData, nameCours }) => ({
        url: `/HomeLecturer/${nameCours}`,  // שם הקורס נכנס ב-URL
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Material"],
    }),
    


    getAllMaterialsByNameCourse: builder.query<VideosResponse, string>({
      query: (courseName) => `/HomeLecturer/${courseName}`,
      providesTags: ["Material"],
    }),
    


    // קבלת סרטון לפי מזהה
    getMaterialById: builder.query<Video, string>({
      query: (id) => `/HomeLecturer/${id}`,  // ניתן לעדכן את הנתיב כך שיתאים לכל סרטון
      providesTags: ["Material"]
    }),

    
    upDateMaterial: builder.mutation<Video, FormData>({
      query: (formData) => {
        const nameCours = formData.get("nameCours") as string;
        return {
          url: `/HomeLecturer/${nameCours}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Material"],
    }),
    
    

    // מחיקת חומר (סרטון)
    deleteMaterial: builder.mutation<void, string>({
      query: (courseName) => ({
        url: `/HomeLecturer/material/${courseName}`,  // השתמש ב-videoPath כפרמטר ב-URL
        method: "DELETE",
      }),
      invalidatesTags: ["Material"],
    }),

getNewVideos: builder.query<Video[], string>({
  query: (lastLogin) => `/users/new-videos/${lastLogin}`,
  providesTags: ['User'],
}),

    // עדכון תאריך התחברות - זו מוטציה, לכן invalidatesTags בסדר
    updateLastLogin: builder.mutation<void, void>({
      query: () => ({
        url: '/users/update-last-login',
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
    getExpiredMaterialsLast5Days: builder.query<Video[], void>({  // לא צריך פרמטרים
  query: () => `HomeLecturer/materials/expired-materials-last-5-days`,
  providesTags: ['Material'],
}),
    
  })
  
});

// יצוא הפונקציות שניתן להשתמש בהן ב-React
export const { 
  useAddMaterialMutation,
  useGetAllMaterialsByNameCourseQuery,
  useGetMaterialByIdQuery,
  useUpDateMaterialMutation,
  useDeleteMaterialMutation,
  useGetNewVideosQuery,
  useUpdateLastLoginMutation,
  useGetExpiredMaterialsLast5DaysQuery
} = materialsApiSlice;

export default materialsApiSlice;




