import apiSlice from './apiSlice';
const materialsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addMaterial: builder.mutation({
            query: (newMaterial) => ({
                url: "/material",
                method: "POST",
                body: newMaterial
            }),
            invalidatesTags: ["Material"]
        }),
        getAllMaterials: builder.query({
            query: () => "/material",
            providesTags: ["Material"]
        }),
        getMaterialById: builder.query({
            query: (id) => `/material/${id}`,
            providesTags: ["Material"]
        }),
        editMaterial: builder.mutation({
            query: (updatedMaterial) => ({
                url: `/material/${updatedMaterial.LearningMaterialId}`,
                method: "PUT",
                body: updatedMaterial
            }),
            invalidatesTags: ["Material"]
        }),
        deleteMaterial: builder.mutation({
            query: (id) => ({
                url: `/material/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Material"]
       }),
    })
})
export const { 
    useAddMaterialMutation,
    useGetAllMaterialsQuery,
    useGetMaterialByIdQuery,
    useEditMaterialMutation,
    useDeleteMaterialMutation
} = materialsApiSlice;
export default materialsApiSlice;