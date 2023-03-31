import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserEntityType } from '@/utils/Types';

type FriendsListType = {
    friends: Array<UserEntityType>;
    friendWaits: Array<UserEntityType>;
}

const initialFriends: FriendsListType = {
    friends: [],
    friendWaits: [],
}

const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialFriends,
    reducers: {
        fillFriendsList(state, action: PayloadAction<UserEntityType>) {
            state.friends.push(action.payload);
        },
        setFriendsList(state, action: PayloadAction<Array<UserEntityType>>) {
            state.friends = action.payload;
        },
        loginFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isOnline = true;
                }
            }
        },
        logoutFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isOnline = false;
                }
            }
        },
        fillFriendWaitsList(state, action: PayloadAction<UserEntityType>) {
            state.friendWaits.push(action.payload);
        },
        setFriendWaitsList(state, action: PayloadAction<Array<UserEntityType>>) {
            state.friendWaits = action.payload;
        },
        acceptFriendRequest(state, action: PayloadAction<UserEntityType>) {
            state.friendWaits = state.friendWaits.filter((f) => 
                !(f.id === action.payload.id)
            )
            state.friends.push(action.payload);
        },
        removeFriendWaits(state, action: PayloadAction<number>) {
            state.friendWaits = state.friendWaits.filter((f) => 
                !(f.id === action.payload)
            )
        }
    },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice.reducer;