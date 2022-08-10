import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'user',
    initialState: {
        posts:[],
        loading:false,
        error:false,
        errorMessage:null,
    },
    reducers:{},
    extraReducers:{
        [getUserInfo.fulfilled]:(state,action)=>{
            state.loading = false;
        },
        [getUserInfo.pending]:(state,action)=>{
            state.loading = true;
        },
        [getUserInfo.rejected]:(state,action)=>{
            state.loading = false;
        }
        ,
    }
})


export default userSlice.reducer;