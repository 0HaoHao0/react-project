import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: "user",
    initialState: {
        userToken: "ex",
        userName: "ex",
        email: "ex@gmail.com"
    },
    reducers: {
        setUserToken: (state, actions) => {
            state.userToken += actions.payload;
        }
    }
})

const { actions, reducer } = userSlice;


export const { setUserToken } = actions;

export default reducer;