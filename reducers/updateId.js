import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "",
};

 const updateIdSlice = createSlice({
    name: "updateId",
    initialState,
    reducers: {
        addUpdateIdToStore: (state, action) => {
            
            state.value = action.payload;
        },
    },
});

export const { addUpdateIdToStore } = updateIdSlice.actions;
export default updateIdSlice.reducer;


