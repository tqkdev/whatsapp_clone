import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Kiểm tra sessionStorage để lấy currentUserId và username nếu có
const initialState = {
    currentUserId: typeof window !== 'undefined' ? sessionStorage.getItem('currentUserId') : null,
    currentUserName: typeof window !== 'undefined' ? sessionStorage.getItem('currentUserName') : null,
    currentUserAvatar: typeof window !== 'undefined' ? sessionStorage.getItem('currentUserAvatar') : null,
    currentUserGender: typeof window !== 'undefined' ? sessionStorage.getItem('currentUserGender') : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setcurrentUserId: (state, action: PayloadAction<string>) => {
            state.currentUserId = action.payload;
            // Lưu currentUserId vào sessionStorage
            sessionStorage.setItem('currentUserId', action.payload);
        },
        setUsername: (state, action: PayloadAction<string>) => {
            state.currentUserName = action.payload;
            // Lưu username vào sessionStorage
            sessionStorage.setItem('currentUserName', action.payload);
        },
        // setcurrentUserAvatar: (state, action: PayloadAction<string>) => {
        //     state.currentUserAvatar = action.payload;
        //     // Lưu username vào sessionStorage
        //     sessionStorage.setItem('currentUserAvatar', action.payload);
        // },
        setcurrentUserGender: (state, action: PayloadAction<string>) => {
            state.currentUserGender = action.payload;
            // Lưu username vào sessionStorage
            sessionStorage.setItem('currentUserGender', action.payload);
        },
        clearUser: (state) => {
            state.currentUserId = null;
            state.currentUserName = null;
            state.currentUserAvatar = null;
            state.currentUserGender = null;
            // Xóa currentUserId và username khỏi sessionStorage
            sessionStorage.removeItem('currentUserId');
            sessionStorage.removeItem('currentUserName');
            // sessionStorage.removeItem('currentUserAvatar');
            sessionStorage.removeItem('currentUserGender');
        },
    },
});

// Export các actions để sử dụng trong component
export const { setcurrentUserId, setUsername, setcurrentUserGender, clearUser } = userSlice.actions;

// Export reducer để sử dụng trong store
export default userSlice.reducer;
