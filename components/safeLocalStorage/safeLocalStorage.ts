import {create} from 'zustand'

export const userStore = create((set) => ({
    userID: null,
    setUserID: (userID: number) => set({userID: userID}),
}));
