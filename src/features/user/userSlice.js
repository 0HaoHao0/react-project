import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
    name: "user",
    initialState: {

    },
    reducers: {
        setUserData: (state, actions) => {
            state.id = actions.payload.id
            state.userName = actions.payload.userName
            state.fullName = actions.payload.fullName
            state.email = actions.payload.email
            state.role = actions.payload.role
            state.imageURL = actions.payload.imageURL
        },
        clearUserData: (state) => {
            state.id = null
            state.userName = null
            state.fullName = null
            state.email = null
            state.role = null
            state.imageURL = null
        },
        updateImageURL: (state, actions) => {
            state.imageURL = actions.payload
        }
    }
})

const { actions, reducer } = userSlice;


export const { setUserData, clearUserData, updateImageURL } = actions;

export default reducer;