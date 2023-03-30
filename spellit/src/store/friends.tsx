import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '@/utils/Types';

type FriendListType = {
    friends: Array<UserType>;
}

const initialFriends: FriendListType = {
    friends: [],
}

const friendSlice = createSlice({
    name: 'friends',
    initialState: initialFriends,
    reducers: {
        fillFriendsList(state, action: PayloadAction<UserType>) {
            state.friends.push(action.payload);
        },
        logoutFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isOnline = false;
                }
            }
        }
    },
});

export const friendActions = friendSlice.actions;

export default friendSlice.reducer;