import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => "/tasks",
            transformResponse: (tasks) => [...tasks].reverse(),
            providesTags: ['Tasks'],
        }),
        addTask: builder.mutation({
            query: (task) => ({
                url: "/tasks",
                method: "POST",
                body: task,
            }),
            async onQueryStarted(task, {dispatch, queryFulfilled}) {
                const tempId = `temp_${Date.now()}`;
                const patchResult = dispatch(
                    api.util.updateQueryData('getTasks', undefined, (draft) => {
                        draft.unshift({ id: tempId, ...task });
                    }),
                );
                try {
                    const { data: created } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getTasks', undefined, (draft) => {
                        const index = draft.findIndex((el) => el.id === tempId);
                        if (index !== -1) {
                            draft[index] = created;
                        }
                    }));
                } catch {
                    patchResult.undo();
                }
            },
        }),
        updatetask: builder.mutation({
            query: ({id, ...updatedTask}) => ({
                url: `/tasks/${id}`,
                method: 'PATCH',
                body: updatedTask,
            }),
            async onQueryStarted({ id, ...updatedTask }, {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    api.util.updateQueryData('getTasks', undefined, (tasksList) => {
                        const taskIndex = tasksList.findIndex((el) => el.id === id);
                        if (taskIndex !== -1) {
                            tasksList[taskIndex] = {...tasksList[taskIndex], ...updatedTask};
                        }
                    }),
                );
                try {
                    const { data: updated } = await queryFulfilled;
                    dispatch(api.util.updateQueryData('getTasks', undefined, (tasksList) => {
                        const taskIndex = tasksList.findIndex((el) => el.id === id);
                        if (taskIndex !== -1 && updated) {
                            tasksList[taskIndex] = updated;
                        }
                    }));
                } catch {
                    patchResult.undo();
                }
            },
    }),
     deletetask: builder.mutation({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
        }),
         async onQueryStarted(  id , {dispatch, queryFulfilled}) {
                const patchResult = dispatch(
                    api.util.updateQueryData('getTasks', undefined, (tasksList) => {
                        const taskIndex = tasksList.findIndex((el) => el.id === id);
                        if (taskIndex !== -1) {
                            tasksList.splice(taskIndex, 1);
                        }
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
    }),
}),
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdatetaskMutation, useDeletetaskMutation} = api;