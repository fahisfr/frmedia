
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo:{
            userName:null,
            bio:null,
            link:null,
            profilePic:null,
            avatarPic:null,
            followingCount:null,
            followersCount:null,
        },
        posts:[],
        loading:false,
        error:false,
    } ,
    reducers:{
        setUserInfo:(state,action)=> state.userInfo = action.payload,
        setPosts:(state,action)=> state.posts.push(action.payload),


    },
    extraReducers:{
        [getUserInfo.fulfilled]:(state,action)=>{},
        [getUserInfo.pending]:(state,action)=>{},
        [getUserInfo.rejected]:(state,action)=>{},
    }

});



export default userSlice.reducer;