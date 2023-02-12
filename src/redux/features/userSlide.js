import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: undefined,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        createUser: (state, data) => {
            console.log(data.payload);
            state.userInfo = data.payload
        },
        deleteUser: (state) => {
            state.userInfo = undefined
        }
    },
})

// Action creators are generated for each case reducer function
export const { createUser, deleteUser } = userSlice.actions

export default userSlice.reducer