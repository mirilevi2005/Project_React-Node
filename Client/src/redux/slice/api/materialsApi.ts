

import { Video, VideosResponse } from '../../../interface/VideoMaterial';
import apiSlice from './apiSlice';

const materialsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addMaterial: builder.mutation({
      query: ({ formData, nameCours }) => ({
        url: `/HomeLecturer/${nameCours}`, 
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Material"],
    }),
    


    getAllMaterialsByNameCourse: builder.query<VideosResponse, string>({
      query: (courseName) => `/HomeLecturer/${courseName}`,
      providesTags: ["Material"],
    }),
    


    getMaterialById: builder.query<Video, string>({
      query: (id) => `/HomeLecturer/${id}`,  
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
        url: `/HomeLecturer/material/${courseName}`,  
        method: "DELETE",
      }),
      invalidatesTags: ["Material"],
    }),

getNewVideos: builder.query<Video[], string>({
  query: (lastLogin) => `/users/new-videos/${lastLogin}`,
  providesTags: ['User'],
}),

   
    updateLastLogin: builder.mutation<void, void>({
      query: () => ({
        url: '/users/update-last-login',
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
    getExpiredMaterialsLast5Days: builder.query<Video[], void>({  
  query: () => `HomeLecturer/materials/expired-materials-last-5-days`,
  providesTags: ['Material'],
}),
    
  })
  
});

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




