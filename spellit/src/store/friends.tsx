import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserEntityType } from '@/utils/Types';

type FriendsListType = {
    friends: Array<UserEntityType>;
    friendWaits: Array<UserEntityType>;
    matchRequestModalFlag: boolean;
    matchRequestPlayer: UserEntityType | null,
}

const initialFriends: FriendsListType = {
    friends: [],
    friendWaits: [],
    matchRequestModalFlag: false,
    matchRequestPlayer: null,
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
                    user.isPlaying = false;
                }
            }
        },
        playStartFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isPlaying = true;
                }
            }
        },
        playEndFriend(state, action: PayloadAction<Number>) {
            for (let user of state.friends) {
                if (user.id === action.payload) {
                    user.isPlaying = false;
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
        },
        setMatchRequestModalFlag(state, action: PayloadAction<boolean>) {
            state.matchRequestModalFlag = action.payload;
        },
        setMatchRequestPlayer(state, action: PayloadAction<UserEntityType>) { 
            state.matchRequestPlayer = action.payload;
        },
    },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice.reducer;